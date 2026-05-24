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
import {
  useCreateCustomer,
  useCustomer,
  useDeleteCustomer,
  useJamaByCustomer,
  useTransactionHistory,
  useUdharByCustomer,
  useUpdateCustomer,
} from "@/hooks/useBackend";
import { formatCurrency, formatDate } from "@/lib/formatCurrency";
import { CustomerStatus, TransactionKind } from "@/types";
import type { Customer, Udhar } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  ChevronLeft,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
  TrendingDown,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

function bigToNum(n: bigint): number {
  return Number(n);
}

function tsToDate(ts: bigint): Date {
  return new Date(Number(ts) / 1_000_000);
}

type RiskLevel = "Low" | "Medium" | "High";

function getRiskLevel(outstanding: bigint, totalCredit: bigint): RiskLevel {
  if (totalCredit === 0n) return "Low";
  const ratio = (Number(outstanding) / Number(totalCredit)) * 100;
  if (ratio <= 33) return "Low";
  if (ratio <= 66) return "Medium";
  return "High";
}

const RISK_STYLES: Record<RiskLevel, string> = {
  Low: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  High: "bg-red-500/15 text-red-400 border border-red-500/30",
};

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent?: "default" | "success" | "destructive" | "warning";
  ocid: string;
}

function StatCard({
  label,
  value,
  icon,
  accent = "default",
  ocid,
}: StatCardProps) {
  const accentClasses: Record<string, string> = {
    default: "text-primary",
    success: "text-emerald-400",
    destructive: "text-red-400",
    warning: "text-amber-400",
  };
  const bgClasses: Record<string, string> = {
    default: "bg-primary/10",
    success: "bg-emerald-500/10",
    destructive: "bg-red-500/10",
    warning: "bg-amber-500/10",
  };
  return (
    <div
      data-ocid={ocid}
      className="glass-card rounded-xl p-4 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${bgClasses[accent]}`}
        >
          <span className={accentClasses[accent]}>{icon}</span>
        </span>
      </div>
      <p
        className={`text-lg font-bold font-display truncate ${accentClasses[accent]}`}
      >
        {value}
      </p>
    </div>
  );
}

interface LedgerRowProps {
  date: string;
  kind: TransactionKind;
  description: string;
  amount: string;
  runningBalance: string;
  index: number;
  udharEntry?: Udhar;
  currencyCode: string;
}

function RepaymentBadge({ type }: { type: "fixedDaily" | "interestLoan" }) {
  const { t } = useAppContext();
  if (type === "fixedDaily") {
    return (
      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
        {t("fixedDaily")}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
      {t("interestLoan")}
    </span>
  );
}

function FixedDailySummary({
  udhar,
  currencyCode,
}: {
  udhar: Udhar;
  currencyCode: string;
}) {
  const fmt = (n: number) =>
    n.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  const symbol =
    currencyCode === "INR"
      ? "₹"
      : currencyCode === "USD"
        ? "$"
        : currencyCode === "GBP"
          ? "£"
          : "";
  const prefix = symbol || `${currencyCode} `;
  return (
    <p className="text-sm text-muted-foreground mt-1">
      {prefix}
      {fmt(udhar.dailyAmount ?? 0)}/day × {Number(udhar.totalDays ?? 0)} days ={" "}
      <span className="font-semibold text-teal-600 dark:text-teal-400">
        {prefix}
        {fmt(udhar.totalToCollect ?? 0)}
      </span>
      {" | Profit: "}
      <span className="font-semibold text-teal-600 dark:text-teal-400">
        {prefix}
        {fmt(udhar.profitAmount ?? 0)}
      </span>
    </p>
  );
}

function InterestLoanBreakdown({
  udhar,
  currencyCode,
}: {
  udhar: Udhar;
  currencyCode: string;
}) {
  const { t } = useAppContext();
  const [expanded, setExpanded] = useState(false);
  const fmt = (n: number) =>
    n.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  const symbol =
    currencyCode === "INR"
      ? "₹"
      : currencyCode === "USD"
        ? "$"
        : currencyCode === "GBP"
          ? "£"
          : "";
  const prefix = symbol || `${currencyCode} `;
  const months = Number(udhar.loanDurationMonths ?? 0);

  return (
    <div className="mt-1.5">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="customer_detail.loan_breakdown_toggle"
      >
        <span>
          Rate: {udhar.interestRate ?? 0}%/month × {months} months
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="bg-card/50 border border-border rounded-lg p-3 mt-2 space-y-1.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            {t("repaymentBreakdown")}
          </p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("totalInterest")}</span>
            <span className="font-semibold text-teal-600 dark:text-teal-400">
              {prefix}
              {fmt(udhar.totalInterest ?? 0)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("totalPayable")}</span>
            <span className="font-semibold text-teal-600 dark:text-teal-400">
              {prefix}
              {fmt(udhar.totalPayable ?? 0)}
            </span>
          </div>
          {udhar.dailyInstallment != null && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {t("dailyInstallment")}
              </span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                {prefix}
                {fmt(udhar.dailyInstallment)}
              </span>
            </div>
          )}
          {udhar.monthlyInstallment != null && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {t("monthlyInstallment")}
              </span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                {prefix}
                {fmt(udhar.monthlyInstallment)}
              </span>
            </div>
          )}
          {udhar.quarterlyInstallment != null && months >= 3 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {t("quarterlyInstallment")}
              </span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                {prefix}
                {fmt(udhar.quarterlyInstallment)}
              </span>
            </div>
          )}
          {udhar.halfYearlyInstallment != null && months >= 6 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {t("halfYearlyInstallment")}
              </span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">
                {prefix}
                {fmt(udhar.halfYearlyInstallment)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LedgerRow({
  date,
  kind,
  description,
  amount,
  runningBalance,
  index,
  udharEntry,
  currencyCode,
}: LedgerRowProps) {
  const isCredit = kind === TransactionKind.udhar;
  const repType = udharEntry?.repaymentType;
  // Derive a stable status — udhar = processing (outstanding), jama = success (settled)
  const statusClass = isCredit
    ? "status-badge status-badge-processing"
    : "status-badge status-badge-success";
  const _statusLabel = isCredit ? "Dr" : "Cr";

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      data-ocid={`customer_detail.transaction.item.${index + 1}`}
      className={`transaction-card ${isCredit ? "transaction-card-dr" : "transaction-card-cr"} rounded-xl p-4 mb-3`}
    >
      <div className="flex items-start gap-3">
        {/* Dr/Cr icon circle */}
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm ${
            isCredit
              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
              : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          }`}
        >
          {isCredit ? "Dr" : "Cr"}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={statusClass}>
                {isCredit ? "CREDIT" : "COLLECTION"}
              </span>
              {isCredit &&
                (repType === "fixedDaily" || repType === "interestLoan") && (
                  <RepaymentBadge type={repType} />
                )}
            </div>
            {/* Amount right-aligned */}
            <p
              className={`text-base font-bold font-display shrink-0 ${
                isCredit
                  ? "text-red-600 dark:text-red-400"
                  : "text-emerald-700 dark:text-emerald-300"
              }`}
            >
              {isCredit ? "-" : "+"}
              {amount}
            </p>
          </div>

          <p className="text-sm font-medium text-foreground truncate">
            {description ||
              (isCredit ? "Credit issued" : "Collection received")}
          </p>

          {isCredit && udharEntry && repType === "fixedDaily" && (
            <FixedDailySummary udhar={udharEntry} currencyCode={currencyCode} />
          )}
          {isCredit && udharEntry && repType === "interestLoan" && (
            <InterestLoanBreakdown
              udhar={udharEntry}
              currencyCode={currencyCode}
            />
          )}

          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px] text-muted-foreground">{date}</p>
            <p className="text-[11px] text-muted-foreground">
              Bal:{" "}
              <span className="font-semibold text-foreground">
                {runningBalance}
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CustomerDetailPage() {
  const { customerId } = useParams({ strict: false }) as { customerId: string };
  const id = customerId === "new" ? undefined : BigInt(customerId);
  const navigate = useNavigate();
  const { selectedCountry } = useAppContext();
  const currencyCode = selectedCountry.currency.code;
  const dateFormat = selectedCountry.dateFormat;

  const { data: customer, isLoading } = useCustomer(id);
  const { data: transactions = [], isLoading: txLoading } =
    useTransactionHistory(id);
  const { data: udharList = [] } = useUdharByCustomer(id);
  const { data: jamaList = [] } = useJamaByCustomer(id);
  const deleteMutation = useDeleteCustomer();
  const updateMutation = useUpdateCustomer();

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    mobileNumber: "",
    address: "",
    notes: "",
    creditLimit: "",
    email: "",
  });
  const [emailError, setEmailError] = useState("");

  function openEdit() {
    if (!customer) return;
    setEditData({
      name: customer.name,
      mobileNumber: customer.mobileNumber,
      address: customer.address ?? "",
      notes: customer.notes ?? "",
      creditLimit: customer.creditLimit.toString(),
      email: (customer as Customer & { email?: string }).email ?? "",
    });
    setEmailError("");
    setEditOpen(true);
  }

  async function handleDelete() {
    if (!customer) return;
    if (!confirm(`Delete ${customer.name}? This cannot be undone.`)) return;
    await deleteMutation.mutateAsync(customer.id);
    navigate({ to: "/customers" });
  }

  const totalCredit = udharList.reduce((s, u) => s + bigToNum(u.amount), 0);
  const totalCollection = jamaList.reduce((s, j) => s + bigToNum(j.amount), 0);
  const outstandingBalance = customer
    ? bigToNum(customer.outstandingBalance)
    : totalCredit - totalCollection;

  const nextDueDateRaw = udharList
    .filter((u) => u.dueDate)
    .map((u) => u.dueDate as bigint)
    .sort((a, b) => (a < b ? -1 : 1))[0];
  const nextDueDate = nextDueDateRaw
    ? formatDate(tsToDate(nextDueDateRaw), dateFormat)
    : "N/A";

  const riskLevel = getRiskLevel(
    BigInt(Math.round(outstandingBalance)),
    BigInt(Math.round(totalCredit)),
  );

  let runningBal = 0;
  const sortedTx = [...transactions].sort(
    (a, b) => Number(a.createdAt) - Number(b.createdAt),
  );
  const ledgerRows = sortedTx
    .map((tx) => {
      const amt = bigToNum(tx.amount);
      if (tx.kind === TransactionKind.udhar) {
        runningBal += amt;
      } else {
        runningBal -= amt;
      }
      return { tx, runningBal };
    })
    .reverse();

  if (customerId === "new") {
    return (
      <Layout title="New Customer">
        <div className="mx-auto max-w-lg">
          <button
            type="button"
            onClick={() => navigate({ to: "/customers" })}
            className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="customer_detail.back_link"
          >
            <ChevronLeft size={16} /> Customers
          </button>
          <NewCustomerForm />
        </div>
      </Layout>
    );
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-xl space-y-4 px-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-36 rounded-2xl" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </Layout>
    );
  }

  if (!customer) {
    return (
      <Layout>
        <div className="mx-auto max-w-xl py-20 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <User size={28} className="text-muted-foreground" />
          </div>
          <p className="text-foreground font-semibold mb-1">
            Customer not found
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            This customer may have been deleted.
          </p>
          <Button
            type="button"
            size="sm"
            onClick={() => navigate({ to: "/customers" })}
          >
            Back to Customers
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={customer.name}>
      <div className="mx-auto max-w-xl px-4 pb-28 space-y-5">
        <button
          type="button"
          onClick={() => navigate({ to: "/customers" })}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors pt-2"
          data-ocid="customer_detail.back_link"
        >
          <ChevronLeft size={16} /> Customers
        </button>

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="customer_detail.card"
          className="glass-card rounded-2xl p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/30">
                  <User size={24} className="text-primary" />
                </div>
                <span
                  className={`absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${customer.status === CustomerStatus.overdue ? "bg-red-500" : "bg-emerald-500"}`}
                />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-xl font-bold text-foreground truncate">
                  {customer.name}
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Phone size={11} className="text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {customer.mobileNumber}
                  </span>
                </div>
                {customer.address && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin
                      size={11}
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="text-xs text-muted-foreground truncate">
                      {customer.address}
                    </span>
                  </div>
                )}
                {(customer as Customer & { email?: string }).email && (
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Mail
                      size={11}
                      className="text-muted-foreground shrink-0"
                    />
                    <span className="text-xs text-muted-foreground truncate">
                      {(customer as Customer & { email?: string }).email}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <button
                type="button"
                aria-label="Edit customer"
                data-ocid="customer_detail.edit_button"
                onClick={openEdit}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/60 text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors"
              >
                <Pencil size={13} />
              </button>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${RISK_STYLES[riskLevel]}`}
                data-ocid="customer_detail.risk_badge"
              >
                {riskLevel === "High" && <AlertTriangle size={10} />}
                {riskLevel} Risk
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stat Cards 2x2 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="grid grid-cols-2 gap-3"
        >
          <StatCard
            label="Total Credit"
            value={formatCurrency(totalCredit, currencyCode)}
            icon={<TrendingUp size={14} />}
            accent="default"
            ocid="customer_detail.stat_total_credit"
          />
          <StatCard
            label="Total Collection"
            value={formatCurrency(totalCollection, currencyCode)}
            icon={<TrendingDown size={14} />}
            accent="success"
            ocid="customer_detail.stat_total_collection"
          />
          <StatCard
            label="Outstanding Balance"
            value={formatCurrency(outstandingBalance, currencyCode)}
            icon={<Wallet size={14} />}
            accent={outstandingBalance > 0 ? "destructive" : "success"}
            ocid="customer_detail.stat_outstanding"
          />
          <StatCard
            label="Next Due Date"
            value={nextDueDate}
            icon={<Calendar size={14} />}
            accent={nextDueDate !== "N/A" ? "warning" : "default"}
            ocid="customer_detail.stat_due_date"
          />
        </motion.div>

        {/* Notes */}
        {customer.notes && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="glass-sm rounded-xl px-4 py-3 flex items-start gap-3"
            data-ocid="customer_detail.notes"
          >
            <FileText
              size={15}
              className="text-muted-foreground shrink-0 mt-0.5"
            />
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                Notes
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {customer.notes}
              </p>
            </div>
          </motion.div>
        )}

        {/* Passbook Ledger */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          data-ocid="customer_detail.ledger"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <CreditCard size={13} />
              Transaction Ledger
            </h3>
            {transactions.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {transactions.length} entries
              </span>
            )}
          </div>
          <div className="glass-card rounded-2xl overflow-hidden p-3">
            {txLoading ? (
              <div className="space-y-2 p-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            ) : ledgerRows.length === 0 ? (
              <div
                data-ocid="customer_detail.transactions.empty_state"
                className="py-14 text-center"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50">
                  <CreditCard size={20} className="text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  No transactions yet
                </p>
                <p className="text-xs text-muted-foreground">
                  Credit or collection entries will appear here.
                </p>
              </div>
            ) : (
              <div className="pt-1">
                {ledgerRows.map(({ tx, runningBal: bal }, i) => {
                  const matchedUdhar =
                    tx.kind === TransactionKind.udhar
                      ? udharList.find((u) => u.id === tx.id)
                      : undefined;
                  return (
                    <LedgerRow
                      key={tx.id.toString()}
                      index={i}
                      date={formatDate(tsToDate(tx.createdAt), dateFormat)}
                      kind={tx.kind as TransactionKind}
                      description={tx.description}
                      amount={formatCurrency(bigToNum(tx.amount), currencyCode)}
                      runningBalance={formatCurrency(bal, currencyCode)}
                      udharEntry={matchedUdhar}
                      currencyCode={currencyCode}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </motion.section>

        {/* Danger Zone */}
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <p className="mb-3 text-sm font-medium text-destructive">
            Danger Zone
          </p>
          <Button
            variant="destructive"
            size="sm"
            type="button"
            data-ocid="customer_detail.delete_button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="gap-1.5"
          >
            <Trash2 size={14} />
            {deleteMutation.isPending ? "Deleting..." : "Delete Customer"}
          </Button>
        </div>
      </div>

      {/* Floating Quick Actions */}
      <div
        className="fixed bottom-6 left-0 right-0 flex justify-center gap-3 px-4 z-30 pointer-events-none"
        data-ocid="customer_detail.quick_actions"
      >
        <Button
          type="button"
          variant="outline"
          className="pointer-events-auto gap-2 rounded-full px-5 shadow-lg border-emerald-500/40 text-emerald-400 bg-card/80 backdrop-blur-sm hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all"
          data-ocid="customer_detail.collection_button"
          onClick={() =>
            navigate({
              to: "/jama/new",
              search: { customerId: customer.id.toString() } as Record<
                string,
                string
              >,
            })
          }
        >
          <ArrowDownLeft size={15} />
          Add Collection
        </Button>
        <Button
          type="button"
          className="pointer-events-auto gap-2 rounded-full px-5 shadow-lg bg-primary hover:bg-primary/90 transition-all"
          data-ocid="customer_detail.credit_button"
          onClick={() =>
            navigate({
              to: "/udhar/new",
              search: { customerId: customer.id.toString() } as Record<
                string,
                string
              >,
            })
          }
        >
          <ArrowUpRight size={15} />
          Add Credit
        </Button>
      </div>

      {/* Edit Customer Sheet */}
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Edit Customer</SheetTitle>
          </SheetHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (!customer) return;
              if (
                editData.email &&
                !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(editData.email)
              ) {
                setEmailError("Invalid email format");
                return;
              }
              setEmailError("");
              await updateMutation.mutateAsync({
                id: customer.id,
                args: {
                  name: editData.name,
                  mobileNumber: editData.mobileNumber,
                  address: editData.address,
                  notes: editData.notes,
                  creditLimit: BigInt(editData.creditLimit || "0"),
                  email: editData.email || undefined,
                },
              });
              setEditOpen(false);
            }}
            className="space-y-3 py-4"
          >
            <div className="space-y-1.5">
              <label
                htmlFor="edit-name"
                className="text-sm font-medium text-foreground"
              >
                Customer Name *
              </label>
              <Input
                id="edit-name"
                required
                placeholder="e.g. Ramesh Kumar"
                value={editData.name}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="customer_detail.edit_name_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="edit-mobile"
                className="text-sm font-medium text-foreground"
              >
                Mobile Number *
              </label>
              <Input
                id="edit-mobile"
                required
                placeholder="9876543210"
                value={editData.mobileNumber}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, mobileNumber: e.target.value }))
                }
                data-ocid="customer_detail.edit_mobile_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="edit-address"
                className="text-sm font-medium text-foreground"
              >
                Address
              </label>
              <Input
                id="edit-address"
                placeholder="House no, Street, City"
                value={editData.address}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, address: e.target.value }))
                }
                data-ocid="customer_detail.edit_address_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="edit-limit"
                className="text-sm font-medium text-foreground"
              >
                Credit Limit
              </label>
              <Input
                id="edit-limit"
                type="number"
                min="0"
                placeholder="5000"
                value={editData.creditLimit}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, creditLimit: e.target.value }))
                }
                data-ocid="customer_detail.edit_credit_limit_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="edit-notes"
                className="text-sm font-medium text-foreground"
              >
                Notes
              </label>
              <Input
                id="edit-notes"
                placeholder="Optional notes"
                value={editData.notes}
                onChange={(e) =>
                  setEditData((p) => ({ ...p, notes: e.target.value }))
                }
                data-ocid="customer_detail.edit_notes_input"
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="edit-email"
                className="text-sm font-medium text-foreground"
              >
                Email Address{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  (optional)
                </span>
              </label>
              <Input
                id="edit-email"
                type="email"
                placeholder="customer@example.com"
                value={editData.email}
                onChange={(e) => {
                  setEmailError("");
                  setEditData((p) => ({ ...p, email: e.target.value }));
                }}
                data-ocid="customer_detail.edit_email_input"
              />
              {emailError && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="customer_detail.edit_email_field_error"
                >
                  {emailError}
                </p>
              )}
            </div>
            <SheetFooter className="pt-2">
              <Button
                type="submit"
                className="w-full"
                data-ocid="customer_detail.edit_submit_button"
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </Layout>
  );
}

function NewCustomerForm() {
  const createMutation = useCreateCustomer();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = (fd.get("email") as string) || undefined;
    await createMutation.mutateAsync({
      name: fd.get("name") as string,
      mobileNumber: fd.get("mobile") as string,
      address: fd.get("address") as string,
      notes: fd.get("notes") as string,
      creditLimit: BigInt((fd.get("creditLimit") as string) || "0"),
      email,
    });
    navigate({ to: "/customers" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="font-display text-2xl font-bold text-foreground">
        New Customer
      </h1>
      <CustomerFormFields />
      <Button
        type="submit"
        className="w-full"
        data-ocid="new_customer.submit_button"
        disabled={createMutation.isPending}
      >
        {createMutation.isPending ? "Saving..." : "Save Customer"}
      </Button>
    </form>
  );
}

function CustomerFormFields() {
  const inputClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Customer Name *
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="e.g. Ramesh Kumar"
          className={inputClass}
          data-ocid="new_customer.name_input"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="mobile" className="text-sm font-medium text-foreground">
          Mobile Number *
        </label>
        <input
          id="mobile"
          name="mobile"
          required
          placeholder="9876543210"
          className={inputClass}
          data-ocid="new_customer.mobile_input"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="address"
          className="text-sm font-medium text-foreground"
        >
          Address
        </label>
        <input
          id="address"
          name="address"
          placeholder="House no, Street, City"
          className={inputClass}
          data-ocid="new_customer.address_input"
        />
      </div>
      <div className="space-y-1.5">
        <label
          htmlFor="creditLimit"
          className="text-sm font-medium text-foreground"
        >
          Credit Limit
        </label>
        <input
          id="creditLimit"
          name="creditLimit"
          type="number"
          min="0"
          placeholder="5000"
          className={inputClass}
          data-ocid="new_customer.credit_limit_input"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="notes" className="text-sm font-medium text-foreground">
          Notes
        </label>
        <input
          id="notes"
          name="notes"
          placeholder="Optional notes"
          className={inputClass}
          data-ocid="new_customer.notes_input"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email Address{" "}
          <span className="text-xs text-muted-foreground font-normal">
            (optional)
          </span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="customer@example.com"
          className={inputClass}
          data-ocid="new_customer.email_input"
        />
      </div>
    </div>
  );
}
