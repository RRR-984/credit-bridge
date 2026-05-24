import { Layout } from "@/components/Layout";
import { TransactionRow } from "@/components/TransactionRow";
import { useAppContext } from "@/context/AppContext";
import { useCustomers, useTransactionHistory } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { TransactionKind } from "@/types";
import { ArrowUp, ChevronDown, Download, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

type FilterType = "All" | "Credit" | "Collection";
type SortType = "newest" | "oldest" | "amount";

interface MergedTx {
  id: bigint;
  kind: TransactionKind;
  amount: bigint;
  description: string;
  createdAt: bigint;
  customerId: bigint;
  customerName: string;
}

// Fetches transactions for a single customer ID
function CustomerTxLoader({
  customerId,
  customerName,
  onLoad,
}: {
  customerId: bigint;
  customerName: string;
  onLoad: (txs: MergedTx[]) => void;
}) {
  const { data } = useTransactionHistory(customerId);
  const loaded = useRef(false);
  useEffect(() => {
    if (data && !loaded.current) {
      loaded.current = true;
      const mapped: MergedTx[] = data.map((tx) => ({
        id: tx.id,
        kind: tx.kind as TransactionKind,
        amount: tx.amount,
        description: tx.description,
        createdAt: tx.createdAt,
        customerId,
        customerName,
      }));
      onLoad(mapped);
    }
  }, [data, customerId, customerName, onLoad]);
  return null;
}

export default function TransactionsPage() {
  const { t, selectedCountry } = useAppContext();
  const { data: customers = [], isLoading: customersLoading } = useCustomers();

  const [allTxMap, setAllTxMap] = useState<Map<string, MergedTx[]>>(new Map());
  const [filter, setFilter] = useState<FilterType>("All");
  const [sort, setSort] = useState<SortType>("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Scroll-to-top visibility
  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close sort menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLoadTxs = (cid: string, txs: MergedTx[]) => {
    setAllTxMap((prev) => {
      const next = new Map(prev);
      next.set(cid, txs);
      return next;
    });
  };

  // Flatten + filter + sort
  const filtered = useMemo(() => {
    const all: MergedTx[] = [];
    for (const txs of allTxMap.values()) all.push(...txs);

    let out = all;
    if (filter === "Credit")
      out = all.filter((tx) => tx.kind === TransactionKind.udhar);
    else if (filter === "Collection")
      out = all.filter((tx) => tx.kind === TransactionKind.jama);

    return out.sort((a, b) => {
      if (sort === "newest") return Number(b.createdAt) - Number(a.createdAt);
      if (sort === "oldest") return Number(a.createdAt) - Number(b.createdAt);
      return Number(b.amount) - Number(a.amount);
    });
  }, [allTxMap, filter, sort]);

  // Summary stats
  const stats = useMemo(() => {
    const all: MergedTx[] = [];
    for (const txs of allTxMap.values()) all.push(...txs);
    const creditTotal = all
      .filter((t) => t.kind === TransactionKind.udhar)
      .reduce((s, t) => s + Number(t.amount), 0);
    const collectTotal = all
      .filter((t) => t.kind === TransactionKind.jama)
      .reduce((s, t) => s + Number(t.amount), 0);
    return { total: all.length, creditTotal, collectTotal };
  }, [allTxMap]);

  const currency = selectedCountry.currency.code;
  const currencySymbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    AED: "AED ",
    GBP: "£",
  };
  const sym = currencySymbols[currency] ?? `${currency} `;

  const fmtAmt = (n: number) =>
    `${sym}${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

  const handleDownload = () => {
    const all: MergedTx[] = [];
    for (const txs of allTxMap.values()) all.push(...txs);
    const rows = all
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .map((tx) => {
        const d = new Date(Number(tx.createdAt) / 1_000_000);
        return [
          tx.customerName,
          tx.kind === TransactionKind.udhar ? "Credit" : "Collection",
          Number(tx.amount),
          tx.description,
          d.toLocaleString("en-IN"),
        ].join(",");
      });
    const csv = ["Customer,Type,Amount,Description,Date", ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `credit-bridge-transactions-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sortLabels: Record<SortType, string> = {
    newest: t("sortNewest"),
    oldest: t("sortOldest"),
    amount: t("sortAmount"),
  };

  const filterLabels: Record<FilterType, string> = {
    All: t("filterAll"),
    Credit: t("filterCredit"),
    Collection: t("filterCollection"),
  };

  const isLoading = customersLoading;

  return (
    <Layout title={t("transactionsPage")}>
      {/* Preload customer transactions */}
      {customers.map((c) => (
        <CustomerTxLoader
          key={c.id.toString()}
          customerId={c.id}
          customerName={c.name}
          onLoad={(txs) => handleLoadTxs(c.id.toString(), txs)}
        />
      ))}

      <div className="min-h-screen bg-background" data-ocid="transactions.page">
        {/* Header */}
        <div
          className="sticky top-0 z-20 border-b px-4 py-4 md:hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.14 0.03 248 / 0.98), oklch(0.12 0.025 248 / 0.98))",
            borderColor: "oklch(0.26 0.04 248 / 0.6)",
            backdropFilter: "blur(16px)",
          }}
        >
          <h1 className="font-display text-xl font-bold text-foreground">
            {t("transactionsPage")}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {stats.total} transactions
          </p>
        </div>

        <div className="mx-auto max-w-2xl px-4 py-6 md:py-8">
          {/* Desktop page title */}
          <div className="mb-6 hidden md:block">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("transactionsPage")}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {stats.total} total transactions
            </p>
          </div>

          {/* Summary cards */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-xl border px-3 py-3 text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.8), oklch(0.14 0.02 245 / 0.6))",
                borderColor: "oklch(0.26 0.04 248 / 0.5)",
              }}
            >
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {t("filterAll")}
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {stats.total}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border px-3 py-3 text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.58 0.22 10 / 0.12), oklch(0.14 0.02 245 / 0.6))",
                borderColor: "oklch(0.58 0.22 10 / 0.3)",
              }}
            >
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {t("filterCredit")}
              </p>
              <p className="mt-1 text-sm font-bold text-rose-400 truncate">
                {fmtAmt(stats.creditTotal)}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border px-3 py-3 text-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.2 160 / 0.12), oklch(0.14 0.02 245 / 0.6))",
                borderColor: "oklch(0.62 0.2 160 / 0.3)",
              }}
            >
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {t("filterCollection")}
              </p>
              <p className="mt-1 text-sm font-bold text-emerald-400 truncate">
                {fmtAmt(stats.collectTotal)}
              </p>
            </motion.div>
          </div>

          {/* Filters + Sort bar */}
          <div className="mb-4 flex items-center justify-between gap-2">
            {/* Filter pills */}
            <div
              className="flex gap-1 rounded-xl p-1"
              style={{ background: "oklch(0.14 0.02 248 / 0.7)" }}
            >
              {(["All", "Credit", "Collection"] as FilterType[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  data-ocid={`transactions.filter_${f.toLowerCase()}_tab`}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200",
                    filter === f
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {filterLabels[f]}
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div ref={sortRef} className="relative">
              <button
                type="button"
                onClick={() => setShowSortMenu((v) => !v)}
                data-ocid="transactions.sort_dropdown"
                className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-smooth hover:text-foreground"
              >
                <span>{sortLabels[sort]}</span>
                <ChevronDown size={12} />
              </button>
              <AnimatePresence>
                {showSortMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-30 mt-1 w-36 overflow-hidden rounded-xl border border-border/50 shadow-xl"
                    style={{
                      background: "oklch(0.16 0.025 245)",
                      backdropFilter: "blur(12px)",
                    }}
                    data-ocid="transactions.sort_menu"
                  >
                    {(["newest", "oldest", "amount"] as SortType[]).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSort(s);
                          setShowSortMenu(false);
                        }}
                        data-ocid={`transactions.sort_${s}_button`}
                        className={cn(
                          "w-full px-4 py-2.5 text-left text-xs font-medium transition-colors hover:bg-muted/50",
                          sort === s ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {sortLabels[s]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Transaction list */}
          {isLoading ? (
            <div
              className="flex flex-col items-center justify-center py-20 gap-3"
              data-ocid="transactions.loading_state"
            >
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{t("loading")}</p>
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 py-16 text-center"
              data-ocid="transactions.empty_state"
            >
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.15), oklch(0.5 0.2 270 / 0.1))",
                }}
              >
                <span className="text-2xl">📋</span>
              </div>
              <p className="font-display text-base font-semibold text-foreground">
                {t("noTransactions")}
              </p>
              <p className="mt-1 text-xs text-muted-foreground max-w-[200px]">
                {t("noTransactionsYet")}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-2" data-ocid="transactions.list">
              {filtered.map((tx, index) => (
                <TransactionRow
                  key={`${tx.kind}-${tx.id}`}
                  kind={tx.kind}
                  amount={tx.amount}
                  description={tx.description}
                  date={tx.createdAt}
                  customerName={tx.customerName}
                  status="success"
                  txIndex={index + 1}
                  currency={currency}
                  data-ocid={`transactions.item.${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Download Report button */}
          {filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <button
                type="button"
                onClick={handleDownload}
                data-ocid="transactions.download_report_button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 py-3 text-sm font-semibold text-primary transition-smooth hover:bg-primary/20 hover:border-primary/50"
              >
                <Download size={15} />
                {t("downloadReport")}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll-to-top FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label={t("scrollToTop")}
            data-ocid="transactions.scroll_to_top_button"
            className="fixed bottom-24 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-smooth hover:scale-110"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.22 260), oklch(0.5 0.2 270))",
              boxShadow: "0 0 20px oklch(0.62 0.22 260 / 0.5)",
            }}
          >
            <ArrowUp size={18} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </Layout>
  );
}
