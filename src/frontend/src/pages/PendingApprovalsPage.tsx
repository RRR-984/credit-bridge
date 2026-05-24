import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppContext";
import {
  useCustomers,
  useOwnerApprovePaymentRequest,
  useOwnerGetAllPaymentRequests,
  useOwnerGetPendingPaymentRequests,
  useOwnerRejectPaymentRequest,
} from "@/hooks/useBackend";
import { formatCurrency } from "@/lib/formatCurrency";
import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

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

function StatusBadge({
  status,
}: {
  status: import("@/backend").PaymentRequestStatus;
}) {
  const config = {
    pending: {
      label: "Pending",
      bg: "oklch(0.75 0.16 85 / 0.15)",
      color: "oklch(0.8 0.14 85)",
      border: "oklch(0.75 0.16 85 / 0.3)",
      icon: Clock,
    },
    approved: {
      label: "Approved",
      bg: "oklch(0.65 0.2 145 / 0.15)",
      color: "oklch(0.7 0.18 145)",
      border: "oklch(0.65 0.2 145 / 0.3)",
      icon: CheckCircle2,
    },
    rejected: {
      label: "Rejected",
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

function RequestCard({
  req,
  customerName,
  isPending,
  index,
}: {
  req: import("@/backend").CustomerPaymentRequestView;
  customerName: string;
  isPending: boolean;
  index: number;
}) {
  const { t, selectedCountry } = useAppContext();
  const approveMutation = useOwnerApprovePaymentRequest();
  const rejectMutation = useOwnerRejectPaymentRequest();
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const currency = selectedCountry.currency.code;
  const fmt = (n: bigint) => formatCurrency(Number(n), currency);

  const handleApprove = () => {
    approveMutation.mutate(req.id);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;
    rejectMutation.mutate(
      { requestId: req.id, reason: rejectReason.trim() },
      {
        onSuccess: () => setShowRejectInput(false),
      },
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.04 }}
      data-ocid={`approvals.request.item.${index + 1}`}
      className="rounded-xl border p-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.8), oklch(0.14 0.02 245 / 0.6))",
        borderColor: "oklch(0.26 0.04 248 / 0.4)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            {customerName}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {req.paymentType} — {fmt(req.amount)}
          </p>
          {req.notes && (
            <p className="mt-1 text-xs text-muted-foreground/80">{req.notes}</p>
          )}
          <p className="mt-1 text-[10px] text-muted-foreground/50">
            {formatDateLocal(req.createdAt)}
          </p>
        </div>
        <StatusBadge status={req.status} />
      </div>

      {isPending && (
        <div className="mt-3 flex items-center gap-2">
          {!showRejectInput ? (
            <>
              <Button
                size="sm"
                type="button"
                onClick={handleApprove}
                disabled={approveMutation.isPending}
                data-ocid={`approvals.approve_button.${index + 1}`}
                className="gap-1 bg-emerald-600 hover:bg-emerald-700"
              >
                {approveMutation.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={14} />
                )}
                {t("approvePayment")}
              </Button>
              <Button
                size="sm"
                type="button"
                variant="outline"
                onClick={() => setShowRejectInput(true)}
                disabled={rejectMutation.isPending}
                data-ocid={`approvals.reject_button.${index + 1}`}
                className="gap-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                <XCircle size={14} />
                {t("rejectPayment")}
              </Button>
            </>
          ) : (
            <div className="flex w-full items-center gap-2">
              <input
                type="text"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                data-ocid={`approvals.reject_reason_input.${index + 1}`}
                placeholder={t("rejectionReason")}
                className="flex-1 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs text-foreground outline-none"
              />
              <Button
                size="sm"
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowRejectInput(false);
                  setRejectReason("");
                }}
              >
                {t("cancel")}
              </Button>
              <Button
                size="sm"
                type="button"
                onClick={handleReject}
                disabled={rejectMutation.isPending || !rejectReason.trim()}
                data-ocid={`approvals.confirm_reject_button.${index + 1}`}
                className="gap-1 bg-red-600 hover:bg-red-700"
              >
                {rejectMutation.isPending ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <XCircle size={14} />
                )}
                {t("rejectPayment")}
              </Button>
            </div>
          )}
        </div>
      )}

      {req.rejectionReason && (
        <p className="mt-2 text-xs" style={{ color: "oklch(0.65 0.18 25)" }}>
          {t("rejectionReason")}: {req.rejectionReason}
        </p>
      )}
    </motion.div>
  );
}

export default function PendingApprovalsPage() {
  const { t } = useAppContext();
  const [tab, setTab] = useState<"pending" | "all">("pending");

  const { data: pendingRequests = [], isLoading: pendingLoading } =
    useOwnerGetPendingPaymentRequests();
  const { data: allRequests = [], isLoading: allLoading } =
    useOwnerGetAllPaymentRequests();
  const { data: customers = [], isLoading: customersLoading } = useCustomers();

  const customerMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of customers) {
      map.set(c.id.toString(), c.name);
    }
    return map;
  }, [customers]);

  const requests = tab === "pending" ? pendingRequests : allRequests;
  const isLoading = pendingLoading || allLoading || customersLoading;

  return (
    <Layout title={t("pendingApprovals")}>
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              {t("pendingApprovals")}
            </h1>
            <p className="text-sm text-muted-foreground">
              Review and manage customer payment requests
            </p>
          </div>
          {pendingRequests.length > 0 && (
            <span
              className="flex h-7 items-center justify-center rounded-full px-2.5 text-xs font-bold"
              style={{
                background: "oklch(0.75 0.16 85 / 0.2)",
                color: "oklch(0.8 0.14 85)",
              }}
            >
              {pendingRequests.length} pending
            </span>
          )}
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 rounded-xl p-1"
          style={{ background: "oklch(0.14 0.02 248 / 0.7)" }}
        >
          {(["pending", "all"] as const).map((tKey) => (
            <button
              key={tKey}
              type="button"
              onClick={() => setTab(tKey)}
              data-ocid={`approvals.${tKey}_tab`}
              className="flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200"
              style={
                tab === tKey
                  ? {
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.25), oklch(0.5 0.2 270 / 0.2))",
                      color: "oklch(0.82 0.16 260)",
                    }
                  : { color: "oklch(0.58 0.012 245)" }
              }
            >
              {tKey === "pending" ? t("pendingApprovals") : t("allRequests")}
            </button>
          ))}
        </div>

        {/* List */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-12 text-center"
            data-ocid="approvals.empty_state"
          >
            <Clock size={36} className="mb-3 text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">
              {tab === "pending"
                ? t("noPendingApprovals")
                : t("noPaymentRequests")}
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-3">
              {requests.map((req, i) => (
                <RequestCard
                  key={req.id.toString()}
                  req={req}
                  customerName={
                    customerMap.get(req.customerId.toString()) ??
                    "Unknown Customer"
                  }
                  isPending={tab === "pending"}
                  index={i}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </Layout>
  );
}
