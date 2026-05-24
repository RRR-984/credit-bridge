import type { CustomerView } from "@/backend";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppContext } from "@/context/AppContext";
import {
  useAdminBlockCustomer,
  useAdminDeleteCustomer,
  useAdminGetAllCustomers,
  useAdminUnblockCustomer,
  useAdminUpdateCustomer,
} from "@/hooks/useBackend";
import { formatCurrency } from "@/lib/formatCurrency";
import {
  AlertTriangle,
  ChevronRight,
  Lock,
  Pencil,
  Search,
  ShieldAlert,
  Trash2,
  Unlock,
  User,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function AdminCustomersPage() {
  const { t, selectedCountry } = useAppContext();
  const [search, setSearch] = useState("");
  const [editingCustomer, setEditingCustomer] = useState<CustomerView | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<CustomerView | null>(null);

  const { data: customers = [], isLoading } = useAdminGetAllCustomers();
  const blockMutation = useAdminBlockCustomer();
  const unblockMutation = useAdminUnblockCustomer();
  const deleteMutation = useAdminDeleteCustomer();
  const updateMutation = useAdminUpdateCustomer();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.mobileNumber.toLowerCase().includes(q),
    );
  }, [customers, search]);

  const totalCustomers = customers.length;
  const blockedCount = customers.filter((c) => c.blocked).length;

  const handleBlock = async (id: bigint) => {
    try {
      await blockMutation.mutateAsync(id);
      toast.success(t("customerBlocked"));
    } catch {
      toast.error(t("failedToLoad"));
    }
  };

  const handleUnblock = async (id: bigint) => {
    try {
      await unblockMutation.mutateAsync(id);
      toast.success(t("customerUnblocked"));
    } catch {
      toast.error(t("failedToLoad"));
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success(t("customerDeleted"));
      setDeleteTarget(null);
    } catch {
      toast.error(t("failedToLoad"));
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCustomer) return;
    const fd = new FormData(e.currentTarget);
    const args = {
      name: String(fd.get("name") ?? ""),
      mobileNumber: String(fd.get("mobileNumber") ?? ""),
      address: String(fd.get("address") ?? ""),
      creditLimit: BigInt(Number(fd.get("creditLimit") ?? 0)),
      notes: String(fd.get("notes") ?? ""),
    };
    try {
      await updateMutation.mutateAsync({ id: editingCustomer.id, args });
      toast.success(t("customerUpdated"));
      setEditingCustomer(null);
    } catch {
      toast.error(t("failedToLoad"));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-foreground font-display sm:text-2xl">
            {t("customerManagement")}
          </h1>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-ocid="admin.customer.search_input"
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            data-ocid="admin.customer.total_customers_card"
            label={t("totalCustomers")}
            value={String(totalCustomers)}
            icon={Users}
            iconClassName="bg-primary/10 text-primary"
          />
          <StatCard
            data-ocid="admin.customer.blocked_accounts_card"
            label={t("blockedAccounts")}
            value={String(blockedCount)}
            icon={ShieldAlert}
            iconClassName="bg-destructive/10 text-destructive"
          />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}

        {/* Empty */}
        {!isLoading && filtered.length === 0 && (
          <div
            data-ocid="admin.customer.empty_state"
            className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center"
          >
            <User className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">
              {t("noCustomers")}
            </p>
          </div>
        )}

        {/* Desktop Table */}
        {!isLoading && filtered.length > 0 && (
          <div className="hidden overflow-hidden rounded-xl border border-border bg-card shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    {t("name")}
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    {t("mobileNumber")}
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    {t("address")}
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    {t("outstandingBalance")}
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    {t("status")}
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    {t("actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((c, idx) => (
                  <tr
                    key={c.id.toString()}
                    data-ocid={`admin.customer.item.${idx + 1}`}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {c.name}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {c.mobileNumber}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                      {c.address}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {formatCurrency(
                        Number(c.outstandingBalance),
                        selectedCountry.currency.code,
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={c.blocked ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {c.blocked ? t("blocked") : t("active")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Button
                          data-ocid={`admin.customer.edit_button.${idx + 1}`}
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingCustomer(c)}
                          title={t("editCustomer")}
                        >
                          <Pencil size={14} />
                        </Button>
                        {c.blocked ? (
                          <Button
                            data-ocid={`admin.customer.unblock_button.${idx + 1}`}
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-500 hover:text-green-600"
                            onClick={() => handleUnblock(c.id)}
                            disabled={unblockMutation.isPending}
                            title={t("unblockCustomer")}
                          >
                            <Unlock size={14} />
                          </Button>
                        ) : (
                          <Button
                            data-ocid={`admin.customer.block_button.${idx + 1}`}
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-amber-500 hover:text-amber-600"
                            onClick={() => handleBlock(c.id)}
                            disabled={blockMutation.isPending}
                            title={t("blockCustomer")}
                          >
                            <Lock size={14} />
                          </Button>
                        )}
                        <Button
                          data-ocid={`admin.customer.delete_button.${idx + 1}`}
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => setDeleteTarget(c)}
                          title={t("deleteCustomer")}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {!isLoading && filtered.length > 0 && (
          <div className="flex flex-col gap-3 md:hidden">
            {filtered.map((c, idx) => (
              <div
                key={c.id.toString()}
                data-ocid={`admin.customer.item.${idx + 1}`}
                className="glass-card rounded-xl border border-border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {c.name}
                      </p>
                      <Badge
                        variant={c.blocked ? "destructive" : "secondary"}
                        className="text-[10px]"
                      >
                        {c.blocked ? t("blocked") : t("active")}
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {c.mobileNumber}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {c.address}
                    </p>
                    <p className="mt-2 text-sm font-bold text-foreground">
                      {formatCurrency(
                        Number(c.outstandingBalance),
                        selectedCountry.currency.code,
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button
                      data-ocid={`admin.customer.edit_button.${idx + 1}`}
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setEditingCustomer(c)}
                    >
                      <Pencil size={14} />
                    </Button>
                    {c.blocked ? (
                      <Button
                        data-ocid={`admin.customer.unblock_button.${idx + 1}`}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-500"
                        onClick={() => handleUnblock(c.id)}
                        disabled={unblockMutation.isPending}
                      >
                        <Unlock size={14} />
                      </Button>
                    ) : (
                      <Button
                        data-ocid={`admin.customer.block_button.${idx + 1}`}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-amber-500"
                        onClick={() => handleBlock(c.id)}
                        disabled={blockMutation.isPending}
                      >
                        <Lock size={14} />
                      </Button>
                    )}
                    <Button
                      data-ocid={`admin.customer.delete_button.${idx + 1}`}
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => setDeleteTarget(c)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Sheet */}
      <Sheet
        open={!!editingCustomer}
        onOpenChange={() => setEditingCustomer(null)}
      >
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-display">
              {t("editCustomer")}
            </SheetTitle>
          </SheetHeader>
          {editingCustomer && (
            <form onSubmit={handleUpdate} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-name">{t("name")}</Label>
                <Input
                  data-ocid="admin.customer.edit_name_input"
                  id="edit-name"
                  name="name"
                  defaultValue={editingCustomer.name}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-mobile">{t("mobileNumber")}</Label>
                <Input
                  data-ocid="admin.customer.edit_mobile_input"
                  id="edit-mobile"
                  name="mobileNumber"
                  defaultValue={editingCustomer.mobileNumber}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-address">{t("address")}</Label>
                <Input
                  data-ocid="admin.customer.edit_address_input"
                  id="edit-address"
                  name="address"
                  defaultValue={editingCustomer.address}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-limit">{t("creditLimit")}</Label>
                <Input
                  data-ocid="admin.customer.edit_credit_limit_input"
                  id="edit-limit"
                  name="creditLimit"
                  type="number"
                  defaultValue={Number(editingCustomer.creditLimit)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="edit-notes">{t("notes")}</Label>
                <Input
                  data-ocid="admin.customer.edit_notes_input"
                  id="edit-notes"
                  name="notes"
                  defaultValue={editingCustomer.notes}
                />
              </div>
              <div className="mt-2 flex gap-3">
                <Button
                  data-ocid="admin.customer.edit_save_button"
                  type="submit"
                  className="flex-1"
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? t("saving") : t("save")}
                </Button>
                <Button
                  data-ocid="admin.customer.edit_cancel_button"
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setEditingCustomer(null)}
                >
                  {t("cancel")}
                </Button>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog (inline) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            data-ocid="admin.customer.delete_dialog"
            className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {t("areYouSureDelete")}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {t("cannotBeUndone")}
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <Button
                data-ocid="admin.customer.delete_confirm_button"
                type="button"
                variant="destructive"
                className="flex-1"
                disabled={deleteMutation.isPending}
                onClick={() => handleDelete(deleteTarget.id)}
              >
                {deleteMutation.isPending ? t("loading") : t("confirm")}
              </Button>
              <Button
                data-ocid="admin.customer.delete_cancel_button"
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteTarget(null)}
              >
                {t("cancel")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
