import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Search, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

import { useAppContext } from "@/context/AppContext";
import {
  useAdminDeleteJama,
  useAdminDeleteUdhar,
  useAdminGetAllJama,
  useAdminGetAllUdhar,
} from "@/hooks/useBackend";
import { formatCurrency, formatDate } from "@/lib/formatCurrency";

type TxType = "Credit" | "Collection";

interface UnifiedTx {
  id: bigint;
  type: TxType;
  amount: number;
  description: string;
  createdAt: bigint;
}

export default function AdminTransactionsPage() {
  const navigate = useNavigate();
  const { t, selectedCountry } = useAppContext();

  const [filter, setFilter] = useState<"All" | TxType>("All");
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState<bigint | null>(null);

  const { data: udharList = [], isLoading: udharLoading } =
    useAdminGetAllUdhar();
  const { data: jamaList = [], isLoading: jamaLoading } = useAdminGetAllJama();

  const delUdhar = useAdminDeleteUdhar();
  const delJama = useAdminDeleteJama();

  const loading = udharLoading || jamaLoading;

  const txs: UnifiedTx[] = useMemo(() => {
    const u: UnifiedTx[] = udharList.map((x) => ({
      id: x.id,
      type: "Credit",
      amount:
        typeof x.amount === "bigint" ? Number(x.amount) : (x.amount as number),
      description: (x as { description?: string }).description ?? "",
      createdAt: x.createdAt,
    }));
    const j: UnifiedTx[] = jamaList.map((x) => ({
      id: x.id,
      type: "Collection",
      amount:
        typeof x.amount === "bigint" ? Number(x.amount) : (x.amount as number),
      description: (x as { notes?: string }).notes ?? "",
      createdAt: x.createdAt,
    }));
    return [...u, ...j].sort(
      (a, b) => Number(b.createdAt) - Number(a.createdAt),
    );
  }, [udharList, jamaList]);

  const filtered = useMemo(() => {
    let out = txs;
    if (filter !== "All") out = out.filter((x) => x.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (x) =>
          x.description.toLowerCase().includes(q) ||
          x.amount.toString().includes(q) ||
          formatCurrency(x.amount, selectedCountry.currency.code)
            .toLowerCase()
            .includes(q),
      );
    }
    return out;
  }, [txs, filter, search, selectedCountry.currency.code]);

  const stats = useMemo(() => {
    const creditTxs = txs.filter((x) => x.type === "Credit");
    const collectionTxs = txs.filter((x) => x.type === "Collection");
    return {
      creditCount: creditTxs.length,
      collectionCount: collectionTxs.length,
      creditAmount: creditTxs.reduce((s, x) => s + x.amount, 0),
      collectionAmount: collectionTxs.reduce((s, x) => s + x.amount, 0),
    };
  }, [txs]);

  const fmtDate = (ts: bigint) =>
    formatDate(new Date(Number(ts) / 1_000_000), selectedCountry.dateFormat);

  const handleDelete = (tx: UnifiedTx) => {
    if (confirmId === tx.id) {
      if (tx.type === "Credit") delUdhar.mutate(tx.id);
      else delJama.mutate(tx.id);
      setConfirmId(null);
    } else {
      setConfirmId(tx.id);
    }
  };

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-background"
        data-ocid="admin.transactions.loading_state"
      >
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">{t("loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass-card sticky top-0 z-30 border-b px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/admin" })}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 transition-smooth hover:bg-muted"
            data-ocid="admin.transactions.back_button"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
            {t("allTransactions")}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MiniStat
            label={t("credit")}
            value={String(stats.creditCount)}
            color="red"
          />
          <MiniStat
            label={t("collection")}
            value={String(stats.collectionCount)}
            color="green"
          />
          <MiniStat
            label={t("creditTotal")}
            value={formatCurrency(
              stats.creditAmount,
              selectedCountry.currency.code,
            )}
            color="red"
          />
          <MiniStat
            label={t("collectionTotal")}
            value={formatCurrency(
              stats.collectionAmount,
              selectedCountry.currency.code,
            )}
            color="green"
          />
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {(["All", "Credit", "Collection"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-smooth ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                data-ocid={`admin.transactions.filter.${f.toLowerCase()}_tab`}
              >
                {f === "All"
                  ? t("allTransactions")
                  : f === "Credit"
                    ? t("credit")
                    : t("collection")}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-input bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-64"
              data-ocid="admin.transactions.search_input"
            />
          </div>
        </div>

        {/* Empty */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16"
            data-ocid="admin.transactions.empty_state"
          >
            <p className="text-lg font-medium text-muted-foreground">
              {t("noTransactionsYet")}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-hidden rounded-xl border border-border sm:block">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 font-medium text-muted-foreground">
                      {t("dueDate")}
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">
                      {t("credit")}
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">
                      {t("creditAmount")}
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">
                      {t("notes")}
                    </th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((tx, idx) => (
                    <tr
                      key={`${tx.type}-${tx.id}`}
                      className="bg-card transition-smooth hover:bg-muted/30"
                      data-ocid={`admin.transactions.item.${idx + 1}`}
                    >
                      <td className="px-4 py-3 text-foreground">
                        {fmtDate(tx.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <TypeBadge type={tx.type} />
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {formatCurrency(
                          tx.amount,
                          selectedCountry.currency.code,
                        )}
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                        {tx.description || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleDelete(tx)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-smooth ${
                            confirmId === tx.id
                              ? "bg-destructive text-destructive-foreground"
                              : "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          }`}
                          data-ocid={`admin.transactions.delete_button.${idx + 1}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {confirmId === tx.id
                            ? t("confirm")
                            : t("deleteCustomer")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="flex flex-col gap-3 sm:hidden">
              {filtered.map((tx, idx) => (
                <motion.div
                  key={`${tx.type}-${tx.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="glass-sm p-4"
                  data-ocid={`admin.transactions.item.${idx + 1}`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {fmtDate(tx.createdAt)}
                    </span>
                    <TypeBadge type={tx.type} />
                  </div>
                  <p className="mb-1 text-lg font-semibold text-foreground">
                    {formatCurrency(tx.amount, selectedCountry.currency.code)}
                  </p>
                  {tx.description && (
                    <p className="mb-3 text-sm text-muted-foreground">
                      {tx.description}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(tx)}
                    className={`flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-smooth ${
                      confirmId === tx.id
                        ? "bg-destructive text-destructive-foreground"
                        : "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    }`}
                    data-ocid={`admin.transactions.delete_button.mobile.${idx + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    {confirmId === tx.id
                      ? `${t("confirm")} ${t("deleteCustomer")}`
                      : t("deleteCustomer")}
                  </button>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "red" | "green" | "blue" | "amber";
}) {
  const borderMap = {
    red: "border-l-red-500",
    green: "border-l-green-500",
    blue: "border-l-primary",
    amber: "border-l-amber-500",
  };
  return (
    <div className={`glass-sm border-l-4 ${borderMap[color]} p-3`}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}

function TypeBadge({ type }: { type: TxType }) {
  const isCredit = type === "Credit";
  const { t } = useAppContext();
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isCredit
          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      }`}
    >
      {isCredit ? t("credit") : t("collection")}
    </span>
  );
}
