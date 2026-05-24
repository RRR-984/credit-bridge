import { cn } from "@/lib/utils";
import { TransactionKind } from "@/types";
import { motion } from "motion/react";

export type TxStatus = "success" | "processing" | "failed";

interface TransactionRowProps {
  kind: TransactionKind;
  amount: bigint;
  description: string;
  date: bigint;
  customerName?: string;
  status?: TxStatus;
  txIndex?: number;
  currency?: string;
  className?: string;
  "data-ocid"?: string;
}

function formatDateLocal(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  const d = new Date(ms);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatAmountLocal(amount: bigint, currency: string) {
  const symbols: Record<string, string> = {
    INR: "₹",
    USD: "$",
    AED: "AED ",
    GBP: "£",
  };
  const sym = symbols[currency] ?? `${currency} `;
  return `${sym}${Number(amount).toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

export function TransactionRow({
  kind,
  amount,
  description,
  date,
  customerName,
  status = "success",
  txIndex,
  currency = "INR",
  className,
  "data-ocid": dataOcid,
}: TransactionRowProps) {
  const isUdhar = kind === TransactionKind.udhar;
  const txIdShort = `TXN${String(txIndex ?? 0).padStart(6, "0")}`;

  const statusConfig = {
    success: { label: "SUCCESS", cls: "status-badge-success" },
    processing: { label: "PROCESSING", cls: "status-badge-processing" },
    failed: { label: "FAILED", cls: "status-badge-failed" },
  }[status];

  return (
    <motion.div
      data-ocid={dataOcid}
      className={cn(
        "transaction-card",
        isUdhar ? "transaction-card-dr" : "transaction-card-cr",
        className,
      )}
      whileHover={{ scale: 1.008 }}
      whileTap={{ scale: 0.997 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      {/* Top row: title left, amount+badge right */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground leading-tight">
            {customerName || (isUdhar ? "Credit Entry" : "Collection Entry")}
          </p>
          {description && (
            <p className="truncate text-xs text-muted-foreground mt-0.5">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-shrink-0 items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
              isUdhar
                ? "bg-rose-500/15 text-rose-400 dark:bg-rose-500/20 dark:text-rose-300"
                : "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300",
            )}
          >
            {isUdhar ? "Dr" : "Cr"}
          </span>
          <span
            className={cn(
              "text-sm font-bold",
              isUdhar
                ? "text-rose-500 dark:text-rose-400"
                : "text-emerald-600 dark:text-emerald-400",
            )}
          >
            {formatAmountLocal(amount, currency)}
          </span>
        </div>
      </div>

      {/* Bottom row: date left, status right */}
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <p className="text-xs text-muted-foreground">
            {formatDateLocal(date)}
          </p>
          <span className="text-[10px] text-muted-foreground/50 font-mono">
            {txIdShort}
          </span>
        </div>
        <span className={cn("status-badge", statusConfig.cls)}>
          {statusConfig.label}
        </span>
      </div>
    </motion.div>
  );
}
