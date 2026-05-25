import { b as useAppContext, r as reactExports, c as useOwnerGetPendingPaymentRequests, a3 as useOwnerGetAllPaymentRequests, d as useCustomers, j as jsxRuntimeExports, o as motion, A as AnimatePresence, a4 as useOwnerApprovePaymentRequest, a5 as useOwnerRejectPaymentRequest, z as LoaderCircle } from "./index-BOlz_vt-.js";
import { L as Layout, C as Clock } from "./Layout-COj8nO6b.js";
import { B as Button } from "./button-C2O8Pd5v.js";
import { S as Skeleton } from "./skeleton-B0KK6qX6.js";
import { f as formatCurrency } from "./formatCurrency-B6Vczasl.js";
import { C as CircleCheck } from "./circle-check-DDjjY6mE.js";
import { C as CircleX } from "./circle-x-BipWPubv.js";
import "./x-BeJ_vxcM.js";
import "./users-DI-Z_r66.js";
import "./settings-CQ8RcIP4.js";
function formatDateLocal(ts) {
  const ms = Number(ts) / 1e6;
  const d = new Date(ms);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}
function StatusBadge({
  status
}) {
  const config = {
    pending: {
      label: "Pending",
      bg: "oklch(0.75 0.16 85 / 0.15)",
      color: "oklch(0.8 0.14 85)",
      border: "oklch(0.75 0.16 85 / 0.3)",
      icon: Clock
    },
    approved: {
      label: "Approved",
      bg: "oklch(0.65 0.2 145 / 0.15)",
      color: "oklch(0.7 0.18 145)",
      border: "oklch(0.65 0.2 145 / 0.3)",
      icon: CircleCheck
    },
    rejected: {
      label: "Rejected",
      bg: "oklch(0.6 0.2 25 / 0.15)",
      color: "oklch(0.65 0.18 25)",
      border: "oklch(0.6 0.2 25 / 0.3)",
      icon: CircleX
    }
  }[status];
  const Icon = config.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
      style: {
        background: config.bg,
        color: config.color,
        borderColor: config.border
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 10 }),
        config.label
      ]
    }
  );
}
function RequestCard({
  req,
  customerName,
  isPending,
  index
}) {
  const { t, selectedCountry } = useAppContext();
  const approveMutation = useOwnerApprovePaymentRequest();
  const rejectMutation = useOwnerRejectPaymentRequest();
  const [showRejectInput, setShowRejectInput] = reactExports.useState(false);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const currency = selectedCountry.currency.code;
  const fmt = (n) => formatCurrency(Number(n), currency);
  const handleApprove = () => {
    approveMutation.mutate(req.id);
  };
  const handleReject = () => {
    if (!rejectReason.trim()) return;
    rejectMutation.mutate(
      { requestId: req.id, reason: rejectReason.trim() },
      {
        onSuccess: () => setShowRejectInput(false)
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      layout: true,
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, scale: 0.96 },
      transition: { delay: index * 0.04 },
      "data-ocid": `approvals.request.item.${index + 1}`,
      className: "rounded-xl border p-4",
      style: {
        background: "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.8), oklch(0.14 0.02 245 / 0.6))",
        borderColor: "oklch(0.26 0.04 248 / 0.4)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: customerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground capitalize", children: [
              req.paymentType,
              " — ",
              fmt(req.amount)
            ] }),
            req.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground/80", children: req.notes }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-muted-foreground/50", children: formatDateLocal(req.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: req.status })
        ] }),
        isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex items-center gap-2", children: !showRejectInput ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              type: "button",
              onClick: handleApprove,
              disabled: approveMutation.isPending,
              "data-ocid": `approvals.approve_button.${index + 1}`,
              className: "gap-1 bg-emerald-600 hover:bg-emerald-700",
              children: [
                approveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 14 }),
                t("approvePayment")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              type: "button",
              variant: "outline",
              onClick: () => setShowRejectInput(true),
              disabled: rejectMutation.isPending,
              "data-ocid": `approvals.reject_button.${index + 1}`,
              className: "gap-1 border-red-500/30 text-red-400 hover:bg-red-500/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14 }),
                t("rejectPayment")
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: rejectReason,
              onChange: (e) => setRejectReason(e.target.value),
              "data-ocid": `approvals.reject_reason_input.${index + 1}`,
              placeholder: t("rejectionReason"),
              className: "flex-1 rounded-lg border border-border bg-background/60 px-3 py-2 text-xs text-foreground outline-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              type: "button",
              variant: "ghost",
              onClick: () => {
                setShowRejectInput(false);
                setRejectReason("");
              },
              children: t("cancel")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              type: "button",
              onClick: handleReject,
              disabled: rejectMutation.isPending || !rejectReason.trim(),
              "data-ocid": `approvals.confirm_reject_button.${index + 1}`,
              className: "gap-1 bg-red-600 hover:bg-red-700",
              children: [
                rejectMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { size: 14 }),
                t("rejectPayment")
              ]
            }
          )
        ] }) }),
        req.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs", style: { color: "oklch(0.65 0.18 25)" }, children: [
          t("rejectionReason"),
          ": ",
          req.rejectionReason
        ] })
      ]
    }
  );
}
function PendingApprovalsPage() {
  const { t } = useAppContext();
  const [tab, setTab] = reactExports.useState("pending");
  const { data: pendingRequests = [], isLoading: pendingLoading } = useOwnerGetPendingPaymentRequests();
  const { data: allRequests = [], isLoading: allLoading } = useOwnerGetAllPaymentRequests();
  const { data: customers = [], isLoading: customersLoading } = useCustomers();
  const customerMap = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const c of customers) {
      map.set(c.id.toString(), c.name);
    }
    return map;
  }, [customers]);
  const requests = tab === "pending" ? pendingRequests : allRequests;
  const isLoading = pendingLoading || allLoading || customersLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: t("pendingApprovals"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("pendingApprovals") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Review and manage customer payment requests" })
      ] }),
      pendingRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "flex h-7 items-center justify-center rounded-full px-2.5 text-xs font-bold",
          style: {
            background: "oklch(0.75 0.16 85 / 0.2)",
            color: "oklch(0.8 0.14 85)"
          },
          children: [
            pendingRequests.length,
            " pending"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex gap-1 rounded-xl p-1",
        style: { background: "oklch(0.14 0.02 248 / 0.7)" },
        children: ["pending", "all"].map((tKey) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setTab(tKey),
            "data-ocid": `approvals.${tKey}_tab`,
            className: "flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200",
            style: tab === tKey ? {
              background: "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.25), oklch(0.5 0.2 270 / 0.2))",
              color: "oklch(0.82 0.16 260)"
            } : { color: "oklch(0.58 0.012 245)" },
            children: tKey === "pending" ? t("pendingApprovals") : t("allRequests")
          },
          tKey
        ))
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, i)) }) : requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        className: "flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-12 text-center",
        "data-ocid": "approvals.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 36, className: "mb-3 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: tab === "pending" ? t("noPendingApprovals") : t("noPaymentRequests") })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: requests.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      RequestCard,
      {
        req,
        customerName: customerMap.get(req.customerId.toString()) ?? "Unknown Customer",
        isPending: tab === "pending",
        index: i
      },
      req.id.toString()
    )) }) })
  ] }) });
}
export {
  PendingApprovalsPage as default
};
