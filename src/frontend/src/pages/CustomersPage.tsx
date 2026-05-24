import { CustomerCard } from "@/components/CustomerCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppContext";
import { useCreateCustomer, useCustomers } from "@/hooks/useBackend";
import { formatCurrency } from "@/lib/formatCurrency";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Search, Users } from "lucide-react";
import { useState } from "react";

export default function CustomersPage() {
  const { data: customers = [], isLoading } = useCustomers();
  const { t, selectedCountry } = useAppContext();
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    address: "",
    notes: "",
    creditLimit: "",
    email: "",
  });
  const [emailError, setEmailError] = useState("");
  const createMutation = useCreateCustomer();
  const navigate = useNavigate();

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.mobileNumber.includes(search),
  );

  return (
    <Layout title={t("customers")}>
      <div className="mx-auto max-w-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("customers")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Loading..."
                : `${customers.length} customer${customers.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          <Button
            size="sm"
            type="button"
            data-ocid="customers.add_button"
            onClick={() => setSheetOpen(true)}
            className="gap-1.5"
          >
            <Plus size={15} /> {t("addCustomer")}
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="search"
            placeholder="Search by name or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="customers.search_input"
          />
        </div>

        {/* List */}
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="customers.empty_state"
            className="glass-card flex flex-col items-center rounded-xl border border-dashed border-border py-14 text-center"
          >
            <Users size={40} className="mb-3 text-muted-foreground/40" />
            <p className="text-base font-semibold text-foreground">
              {search ? "No results found" : t("noCustomers")}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {search
                ? "Try a different search"
                : "Add your first customer to get started"}
            </p>
            {!search && (
              <Button
                size="sm"
                type="button"
                className="mt-4"
                data-ocid="customers.empty_add_button"
                onClick={() => setSheetOpen(true)}
              >
                {t("addCustomer")}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-2.5 pb-20 md:pb-4">
            {filtered.map((c, i) => (
              <CustomerCard
                key={c.id.toString()}
                id={c.id}
                name={c.name}
                mobileNumber={c.mobileNumber}
                outstandingBalance={c.outstandingBalance}
                status={c.status}
                currency={selectedCountry.currency.code}
                data-ocid={`customers.item.${i + 1}`}
                onClick={() =>
                  navigate({
                    to: "/customers/$customerId",
                    params: { customerId: c.id.toString() },
                  })
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Customer Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{t("addCustomer")}</SheetTitle>
          </SheetHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                formData.email &&
                !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)
              ) {
                setEmailError("Invalid email format");
                return;
              }
              setEmailError("");
              await createMutation.mutateAsync({
                name: formData.name,
                mobileNumber: formData.mobileNumber,
                address: formData.address,
                notes: formData.notes,
                creditLimit: BigInt(formData.creditLimit || "0"),
              });
              setFormData({
                name: "",
                mobileNumber: "",
                address: "",
                notes: "",
                creditLimit: "",
                email: "",
              });
              setEmailError("");
              setSheetOpen(false);
            }}
            className="space-y-3 py-4"
          >
            <div className="space-y-1.5">
              <label
                htmlFor="cs-name"
                className="text-sm font-medium text-foreground"
              >
                Customer Name *
              </label>
              <Input
                id="cs-name"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="customers.add_name_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="cs-mobile"
                className="text-sm font-medium text-foreground"
              >
                Mobile Number *
              </label>
              <Input
                id="cs-mobile"
                required
                placeholder="9876543210"
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, mobileNumber: e.target.value }))
                }
                data-ocid="customers.add_mobile_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="cs-address"
                className="text-sm font-medium text-foreground"
              >
                Address
              </label>
              <Input
                id="cs-address"
                placeholder="House no, Street, City"
                value={formData.address}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, address: e.target.value }))
                }
                data-ocid="customers.add_address_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="cs-limit"
                className="text-sm font-medium text-foreground"
              >
                Credit Limit ({selectedCountry.currency.symbol})
              </label>
              <Input
                id="cs-limit"
                type="number"
                min="0"
                placeholder="5000"
                value={formData.creditLimit}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, creditLimit: e.target.value }))
                }
                data-ocid="customers.add_credit_limit_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="cs-notes"
                className="text-sm font-medium text-foreground"
              >
                Notes
              </label>
              <Input
                id="cs-notes"
                placeholder="Optional notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, notes: e.target.value }))
                }
                data-ocid="customers.add_notes_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="cs-email"
                className="text-sm font-medium text-foreground"
              >
                {t("emailAddress")}{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  {t("optional")}
                </span>
              </label>
              <Input
                id="cs-email"
                type="email"
                placeholder="customer@example.com"
                value={formData.email}
                onChange={(e) => {
                  setEmailError("");
                  setFormData((p) => ({ ...p, email: e.target.value }));
                }}
                data-ocid="customers.add_email_input"
              />
              {emailError && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="customers.add_email_field_error"
                >
                  {emailError}
                </p>
              )}
            </div>
            <SheetFooter className="pt-2">
              <Button
                type="submit"
                className="w-full"
                data-ocid="customers.add_submit_button"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending
                  ? "Saving..."
                  : `${t("save")} Customer`}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
      <FloatingActionButton />
    </Layout>
  );
}
