import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppContext";
import {
  useGetMyCustomerProfile,
  useGetMyOutstandingBalance,
  useGetMyPaymentRequests,
  useGetMyTransactionHistory,
  useLinkMyAccount,
  useSubmitPaymentRequest,
} from "@/hooks/useBackend";
import { formatCurrency } from "@/lib/formatCurrency";
import { PaymentType } from "@/types";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  CreditCard,
  Link2,
  Loader2,
  Send,
  Wallet,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

function formatDateLocal(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  const d = new Date(ms);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function PaymentStatusBadge({
  status,
}: {
  status: import("@/backend").PaymentRequestStatus;
}) {
  const config = {
    pending: {
      label: "Pending",
      labelHi: "लंबित",
      bg: "oklch(0.75 0.16 85 / 0.15)",
      color: "oklch(0.8 0.14 85)",
      border: "oklch(0.75 0.16 85 / 0.3)",
      icon: Clock,
    },
    approved: {
      label: "Approved",
      labelHi: "स्वीकृत",
      bg: "oklch(0.65 0.2 145 / 0.15)",
      color: "oklch(0.7 0.18 145)",
      border: "oklch(0.65 0.2 145 / 0.3)",
      icon: CheckCircle2,
    },
    rejected: {
      label: "Rejected",
      labelHi: "अस्वीकृत",
      bg: "oklch(0.6 0.2 25 / 0.15)",
      color: "oklch(0.65 0.18 25)",
      border: "oklch(0.6 0.2 25 / 0.3)",
      icon: XCircle,
    },
  }[status];
  const Icon = config.icon;
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
      style={{
        background: config.bg,
        color: config.color,
        borderColor: config.border,
      }}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
}

function LinkAccountForm() {
  const { t } = useAppContext();
  const linkMutation = useLinkMyAccount();
  const [customerId, setCustomerId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = BigInt(customerId.trim());
    linkMutation.mutate(
      { customerId: id, mobileNumber: mobileNumber.trim() },
      {
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md"
    >
      <div
        className="rounded-2xl border p-6 md:p-8"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.9), oklch(0.14 0.02 245 / 0.7))",
          borderColor: "oklch(0.26 0.04 248 / 0.5)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="mb-6 text-center">
          <div
            className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.2), oklch(0.5 0.2 270 / 0.15))",
              boxShadow: "0 0 20px oklch(0.62 0.22 260 / 0.2)",
            }}
          >
            <Link2 size={24} style={{ color: "oklch(0.72 0.2 260)" }} />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">
            {t("linkAccount")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Link your account to view your credit history
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="customerId"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {t("enterCustomerId")}
            </label>
            <input
              id="customerId"
              type="number"
              required
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              data-ocid="portal.customer_id_input"
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              placeholder="e.g. 123"
            />
          </div>
          <div>
            <label
              htmlFor="mobileNumber"
              className="mb-1.5 block text-xs font-medium text-muted-foreground"
            >
              {t("mobileNumberLabel")}
            </label>
            <input
              id="mobileNumber"
              type="tel"
              required
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              data-ocid="portal.mobile_number_input"
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
              placeholder="e.g. 9876543210"
            />
          </div>

          {linkMutation.isError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {linkMutation.error instanceof Error
                ? linkMutation.error.message
                : t("accountNotFound")}
            </div>
          )}

          <Button
            type="submit"
            disabled={linkMutation.isPending}
            data-ocid="portal.link_account_button"
            className="w-full gap-2"
          >
            {linkMutation.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Link2 size={16} />
            )}
            {t("linkMyAccount")}
          </Button>
        </form>
      </div>
    </motion.div>
  );
}

function SubmitPaymentModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, selectedCountry } = useAppContext();
  const submitMutation = useSubmitPaymentRequest();
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.cash);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(
      {
        amount: BigInt(amount),
        paymentType,
        notes,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setAmount("");
          setNotes("");
        },
      },
    );
  };

  const handleClose = () => {
    onClose();
    setSubmitted(false);
    setAmount("");
    setNotes("");
    submitMutation.reset();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center"
        onClick={handleClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-t-2xl border p-6 md:rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.98), oklch(0.14 0.02 245 / 0.95))",
            borderColor: "oklch(0.26 0.04 248 / 0.5)",
          }}
        >
          {submitted ? (
            <div className="py-6 text-center">
              <div
                className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full"
                style={{
                  background: "oklch(0.65 0.2 145 / 0.15)",
                }}
              >
                <CheckCircle2
                  size={28}
                  style={{ color: "oklch(0.7 0.18 145)" }}
                />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">
                {t("paymentSubmitted")}
              </h3>
              <Button
                type="button"
                onClick={handleClose}
                className="mt-4"
                variant="outline"
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <h3 className="mb-4 font-display text-lg font-bold text-foreground">
                {t("submitPaymentRequest")}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="paymentAmount"
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  >
                    {t("amountLabel")} ({selectedCountry.currency.code})
                  </label>
                  <input
                    id="paymentAmount"
                    type="number"
                    required
                    min={1}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    data-ocid="portal.payment_amount_input"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label
                    htmlFor="paymentType"
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  >
                    {t("paymentTypeLabel")}
                  </label>
                  <div id="paymentType" className="flex gap-2">
                    {(
                      [
                        { value: PaymentType.cash, label: t("cashPayment") },
                        {
                          value: PaymentType.online,
                          label: t("onlinePayment"),
                        },
                        {
                          value: PaymentType.deposit,
                          label: t("depositPayment"),
                        },
                      ] as const
                    ).map((pt) => (
                      <button
                        key={pt.value}
                        type="button"
                        onClick={() => setPaymentType(pt.value)}
                        data-ocid={`portal.payment_type_${pt.value}_button`}
                        className="flex-1 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all"
                        style={
                          paymentType === pt.value
                            ? {
                                background:
                                  "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.25), oklch(0.5 0.2 270 / 0.2))",
                                borderColor: "oklch(0.62 0.22 260 / 0.4)",
                                color: "oklch(0.82 0.16 260)",
                              }
                            : {
                                background: "oklch(0.14 0.02 248 / 0.5)",
                                borderColor: "oklch(0.26 0.04 248 / 0.3)",
                                color: "oklch(0.58 0.012 245)",
                              }
                        }
                      >
                        {pt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="paymentNotes"
                    className="mb-1.5 block text-xs font-medium text-muted-foreground"
                  >
                    {t("notes")} {t("optional")}
                  </label>
                  <textarea
                    id="paymentNotes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    data-ocid="portal.payment_notes_input"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                    rows={3}
                    placeholder="Add any notes..."
                  />
                </div>
                {submitMutation.isError && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    {submitMutation.error instanceof Error
                      ? submitMutation.error.message
                      : "Failed to submit payment"}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitMutation.isPending}
                    data-ocid="portal.submit_payment_button"
                    className="flex-1 gap-2"
                  >
                    {submitMutation.isPending ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    {t("submitPayment")}
                  </Button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function LinkedDashboard() {
  const { t, selectedCountry } = useAppContext();
  const { data: profile, isLoading: profileLoading } =
    useGetMyCustomerProfile();
  const { data: balance, isLoading: balanceLoading } =
    useGetMyOutstandingBalance();
  const { data: transactions = [], isLoading: txLoading } =
    useGetMyTransactionHistory();
  const { data: requests = [], isLoading: reqLoading } =
    useGetMyPaymentRequests();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const currency = selectedCountry.currency.code;
  const fmt = (n: bigint | number) => formatCurrency(Number(n), currency);

  const totalCredits = transactions
    .filter((tx) => tx.kind === "udhar")
    .reduce((s, tx) => s + Number(tx.amount), 0);
  const totalPayments = transactions
    .filter((tx) => tx.kind === "jama")
    .reduce((s, tx) => s + Number(tx.amount), 0);

  const isLoading = profileLoading || balanceLoading || txLoading || reqLoading;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {t("myAccount")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {profile?.name ?? "Customer"}
          </p>
        </div>
        <Button
          size="sm"
          type="button"
          onClick={() => setShowPaymentModal(true)}
          data-ocid="portal.open_payment_modal_button"
          className="gap-1"
        >
          <CreditCard size={14} /> {t("submitPayment")}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {isLoading ? (
          <>
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
            <Skeleton className="h-28 rounded-xl" />
          </>
        ) : (
          <>
            <StatCard
              data-ocid="portal.outstanding_balance_card"
              label={t("outstandingBalance")}
              value={fmt(balance ?? 0n)}
              icon={Wallet}
              iconClassName="bg-amber-500/10 text-amber-500"
              valueClassName="text-amber-500"
              className="glass-card border-amber-500/20"
            />
            <StatCard
              data-ocid="portal.total_credits_card"
              label={t("totalCredits")}
              value={fmt(totalCredits)}
              icon={ArrowUpRight}
              iconClassName="bg-destructive/10 text-destructive"
              className="glass-card border-destructive/20"
            />
            <StatCard
              data-ocid="portal.total_payments_card"
              label={t("totalPaymentsMade")}
              value={fmt(totalPayments)}
              icon={ArrowDownLeft}
              iconClassName="bg-accent/10 text-accent"
              valueClassName="text-accent"
              className="glass-card border-accent/20"
            />
          </>
        )}
      </div>

      {/* Payment Requests */}
      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("paymentRequests")}
        </h2>
        {reqLoading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div
            data-ocid="portal.payment_requests_empty_state"
            className="flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-8 text-center"
          >
            <Clock size={32} className="mb-2 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              {t("noPaymentRequests")}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {requests.map((req, i) => (
              <motion.div
                key={req.id.toString()}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                data-ocid={`portal.payment_request.item.${i + 1}`}
                className="rounded-xl border p-4"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.7), oklch(0.14 0.02 245 / 0.5))",
                  borderColor: "oklch(0.26 0.04 248 / 0.4)",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {fmt(req.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {req.paymentType}
                    </p>
                  </div>
                  <PaymentStatusBadge status={req.status} />
                </div>
                {req.notes && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {req.notes}
                  </p>
                )}
                {req.rejectionReason && (
                  <p
                    className="mt-1 text-xs"
                    style={{ color: "oklch(0.65 0.18 25)" }}
                  >
                    {t("rejectionReason")}: {req.rejectionReason}
                  </p>
                )}
                <p className="mt-2 text-[10px] text-muted-foreground/60">
                  {formatDateLocal(req.createdAt)}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Transaction History */}
      <section className="pb-24">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t("paymentHistory")}
        </h2>
        {txLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div
            data-ocid="portal.transactions_empty_state"
            className="flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-8 text-center"
          >
            <Wallet size={32} className="mb-2 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">
              {t("noTransactionsYet")}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {transactions.map((tx, i) => (
              <motion.div
                key={`${tx.kind}-${tx.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                data-ocid={`portal.transaction.item.${i + 1}`}
                className="flex items-center justify-between rounded-xl border p-4"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.6), oklch(0.14 0.02 245 / 0.4))",
                  borderColor: "oklch(0.26 0.04 248 / 0.3)",
                }}
              >
                <div>
                  <p className="text-sm font-semibold text-foreground capitalize">
                    {tx.kind === "udhar" ? t("credit") : t("collection")}
                  </p>
                  {tx.description && (
                    <p className="text-xs text-muted-foreground">
                      {tx.description}
                    </p>
                  )}
                  <p className="mt-1 text-[10px] text-muted-foreground/60">
                    {formatDateLocal(tx.createdAt)}
                  </p>
                </div>
                <span
                  className="text-sm font-bold"
                  style={{
                    color:
                      tx.kind === "udhar"
                        ? "oklch(0.65 0.2 25)"
                        : "oklch(0.7 0.18 145)",
                  }}
                >
                  {tx.kind === "udhar" ? "-" : "+"}
                  {fmt(tx.amount)}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <SubmitPaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </div>
  );
}

export default function CustomerPortalPage() {
  const { t } = useAppContext();
  const { data: profile, isLoading } = useGetMyCustomerProfile();

  const isLinked = !!profile && !isLoading;

  return (
    <Layout title={t("customerPortal")}>
      <div className="pt-2">
        {isLoading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loader2 size={28} className="animate-spin text-primary" />
          </div>
        ) : isLinked ? (
          <LinkedDashboard />
        ) : (
          <LinkAccountForm />
        )}
      </div>
    </Layout>
  );
}
