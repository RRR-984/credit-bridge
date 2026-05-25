import { f as createLucideIcon, b as useAppContext, Z as useGetMyCustomerProfile, j as jsxRuntimeExports, z as LoaderCircle, _ as useGetMyOutstandingBalance, $ as useGetMyTransactionHistory, a0 as useGetMyPaymentRequests, r as reactExports, W as Wallet, o as motion, a1 as useLinkMyAccount, a2 as useSubmitPaymentRequest, A as AnimatePresence } from "./index-BOlz_vt-.js";
import { L as Layout, C as Clock } from "./Layout-COj8nO6b.js";
import { S as StatCard } from "./StatCard-D8siFDh7.js";
import { B as Button } from "./button-C2O8Pd5v.js";
import { S as Skeleton } from "./skeleton-B0KK6qX6.js";
import { f as formatCurrency } from "./formatCurrency-B6Vczasl.js";
import { P as PaymentType } from "./types-BB9eb70p.js";
import { C as CreditCard } from "./credit-card-DENnY574.js";
import { a as ArrowUpRight, A as ArrowDownLeft } from "./arrow-up-right-COfzHNXt.js";
import { C as CircleX } from "./circle-x-BipWPubv.js";
import { C as CircleCheck } from "./circle-check-DDjjY6mE.js";
import "./x-BeJ_vxcM.js";
import "./users-DI-Z_r66.js";
import "./settings-CQ8RcIP4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
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
function PaymentStatusBadge({
  status
}) {
  const config = {
    pending: {
      label: "Pending",
      labelHi: "लंबित",
      bg: "oklch(0.75 0.16 85 / 0.15)",
      color: "oklch(0.8 0.14 85)",
      border: "oklch(0.75 0.16 85 / 0.3)",
      icon: Clock
    },
    approved: {
      label: "Approved",
      labelHi: "स्वीकृत",
      bg: "oklch(0.65 0.2 145 / 0.15)",
      color: "oklch(0.7 0.18 145)",
      border: "oklch(0.65 0.2 145 / 0.3)",
      icon: CircleCheck
    },
    rejected: {
      label: "Rejected",
      labelHi: "अस्वीकृत",
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
function LinkAccountForm() {
  const { t } = useAppContext();
  const linkMutation = useLinkMyAccount();
  const [customerId, setCustomerId] = reactExports.useState("");
  const [mobileNumber, setMobileNumber] = reactExports.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = BigInt(customerId.trim());
    linkMutation.mutate(
      { customerId: id, mobileNumber: mobileNumber.trim() },
      {
        onSuccess: () => {
          window.location.reload();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      className: "mx-auto max-w-md",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border p-6 md:p-8",
          style: {
            background: "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.9), oklch(0.14 0.02 245 / 0.7))",
            borderColor: "oklch(0.26 0.04 248 / 0.5)",
            backdropFilter: "blur(16px)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.2), oklch(0.5 0.2 270 / 0.15))",
                    boxShadow: "0 0 20px oklch(0.62 0.22 260 / 0.2)"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { size: 24, style: { color: "oklch(0.72 0.2 260)" } })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: t("linkAccount") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Link your account to view your credit history" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "customerId",
                    className: "mb-1.5 block text-xs font-medium text-muted-foreground",
                    children: t("enterCustomerId")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "customerId",
                    type: "number",
                    required: true,
                    value: customerId,
                    onChange: (e) => setCustomerId(e.target.value),
                    "data-ocid": "portal.customer_id_input",
                    className: "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30",
                    placeholder: "e.g. 123"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "mobileNumber",
                    className: "mb-1.5 block text-xs font-medium text-muted-foreground",
                    children: t("mobileNumberLabel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "mobileNumber",
                    type: "tel",
                    required: true,
                    value: mobileNumber,
                    onChange: (e) => setMobileNumber(e.target.value),
                    "data-ocid": "portal.mobile_number_input",
                    className: "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30",
                    placeholder: "e.g. 9876543210"
                  }
                )
              ] }),
              linkMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: linkMutation.error instanceof Error ? linkMutation.error.message : t("accountNotFound") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  disabled: linkMutation.isPending,
                  "data-ocid": "portal.link_account_button",
                  className: "w-full gap-2",
                  children: [
                    linkMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { size: 16 }),
                    t("linkMyAccount")
                  ]
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function SubmitPaymentModal({
  open,
  onClose
}) {
  const { t, selectedCountry } = useAppContext();
  const submitMutation = useSubmitPaymentRequest();
  const [amount, setAmount] = reactExports.useState("");
  const [paymentType, setPaymentType] = reactExports.useState(PaymentType.cash);
  const [notes, setNotes] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    submitMutation.mutate(
      {
        amount: BigInt(amount),
        paymentType,
        notes
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          setAmount("");
          setNotes("");
        }
      }
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center",
      onClick: handleClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { y: 40, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 40, opacity: 0 },
          transition: { type: "spring", damping: 25, stiffness: 300 },
          onClick: (e) => e.stopPropagation(),
          className: "w-full max-w-md rounded-t-2xl border p-6 md:rounded-2xl",
          style: {
            background: "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.98), oklch(0.14 0.02 245 / 0.95))",
            borderColor: "oklch(0.26 0.04 248 / 0.5)"
          },
          children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full",
                style: {
                  background: "oklch(0.65 0.2 145 / 0.15)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    size: 28,
                    style: { color: "oklch(0.7 0.18 145)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-bold text-foreground", children: t("paymentSubmitted") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleClose,
                className: "mt-4",
                variant: "outline",
                children: "Close"
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 font-display text-lg font-bold text-foreground", children: t("submitPaymentRequest") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "paymentAmount",
                    className: "mb-1.5 block text-xs font-medium text-muted-foreground",
                    children: [
                      t("amountLabel"),
                      " (",
                      selectedCountry.currency.code,
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "paymentAmount",
                    type: "number",
                    required: true,
                    min: 1,
                    value: amount,
                    onChange: (e) => setAmount(e.target.value),
                    "data-ocid": "portal.payment_amount_input",
                    className: "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30",
                    placeholder: "0"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "paymentType",
                    className: "mb-1.5 block text-xs font-medium text-muted-foreground",
                    children: t("paymentTypeLabel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "paymentType", className: "flex gap-2", children: [
                  { value: PaymentType.cash, label: t("cashPayment") },
                  {
                    value: PaymentType.online,
                    label: t("onlinePayment")
                  },
                  {
                    value: PaymentType.deposit,
                    label: t("depositPayment")
                  }
                ].map((pt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setPaymentType(pt.value),
                    "data-ocid": `portal.payment_type_${pt.value}_button`,
                    className: "flex-1 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all",
                    style: paymentType === pt.value ? {
                      background: "linear-gradient(135deg, oklch(0.62 0.22 260 / 0.25), oklch(0.5 0.2 270 / 0.2))",
                      borderColor: "oklch(0.62 0.22 260 / 0.4)",
                      color: "oklch(0.82 0.16 260)"
                    } : {
                      background: "oklch(0.14 0.02 248 / 0.5)",
                      borderColor: "oklch(0.26 0.04 248 / 0.3)",
                      color: "oklch(0.58 0.012 245)"
                    },
                    children: pt.label
                  },
                  pt.value
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "paymentNotes",
                    className: "mb-1.5 block text-xs font-medium text-muted-foreground",
                    children: [
                      t("notes"),
                      " ",
                      t("optional")
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "paymentNotes",
                    value: notes,
                    onChange: (e) => setNotes(e.target.value),
                    "data-ocid": "portal.payment_notes_input",
                    className: "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/30",
                    rows: 3,
                    placeholder: "Add any notes..."
                  }
                )
              ] }),
              submitMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: submitMutation.error instanceof Error ? submitMutation.error.message : "Failed to submit payment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: handleClose,
                    className: "flex-1",
                    children: t("cancel")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "submit",
                    disabled: submitMutation.isPending,
                    "data-ocid": "portal.submit_payment_button",
                    className: "flex-1 gap-2",
                    children: [
                      submitMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 16 }),
                      t("submitPayment")
                    ]
                  }
                )
              ] })
            ] })
          ] })
        }
      )
    }
  ) });
}
function LinkedDashboard() {
  const { t, selectedCountry } = useAppContext();
  const { data: profile, isLoading: profileLoading } = useGetMyCustomerProfile();
  const { data: balance, isLoading: balanceLoading } = useGetMyOutstandingBalance();
  const { data: transactions = [], isLoading: txLoading } = useGetMyTransactionHistory();
  const { data: requests = [], isLoading: reqLoading } = useGetMyPaymentRequests();
  const [showPaymentModal, setShowPaymentModal] = reactExports.useState(false);
  const currency = selectedCountry.currency.code;
  const fmt = (n) => formatCurrency(Number(n), currency);
  const totalCredits = transactions.filter((tx) => tx.kind === "udhar").reduce((s, tx) => s + Number(tx.amount), 0);
  const totalPayments = transactions.filter((tx) => tx.kind === "jama").reduce((s, tx) => s + Number(tx.amount), 0);
  const isLoading = profileLoading || balanceLoading || txLoading || reqLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("myAccount") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: (profile == null ? void 0 : profile.name) ?? "Customer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          type: "button",
          onClick: () => setShowPaymentModal(true),
          "data-ocid": "portal.open_payment_modal_button",
          className: "gap-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 14 }),
            " ",
            t("submitPayment")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          "data-ocid": "portal.outstanding_balance_card",
          label: t("outstandingBalance"),
          value: fmt(balance ?? 0n),
          icon: Wallet,
          iconClassName: "bg-amber-500/10 text-amber-500",
          valueClassName: "text-amber-500",
          className: "glass-card border-amber-500/20"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          "data-ocid": "portal.total_credits_card",
          label: t("totalCredits"),
          value: fmt(totalCredits),
          icon: ArrowUpRight,
          iconClassName: "bg-destructive/10 text-destructive",
          className: "glass-card border-destructive/20"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          "data-ocid": "portal.total_payments_card",
          label: t("totalPaymentsMade"),
          value: fmt(totalPayments),
          icon: ArrowDownLeft,
          iconClassName: "bg-accent/10 text-accent",
          valueClassName: "text-accent",
          className: "glass-card border-accent/20"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: t("paymentRequests") }),
      reqLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "portal.payment_requests_empty_state",
          className: "flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-8 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 32, className: "mb-2 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("noPaymentRequests") })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: requests.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.05 },
          "data-ocid": `portal.payment_request.item.${i + 1}`,
          className: "rounded-xl border p-4",
          style: {
            background: "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.7), oklch(0.14 0.02 245 / 0.5))",
            borderColor: "oklch(0.26 0.04 248 / 0.4)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: fmt(req.amount) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize", children: req.paymentType })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentStatusBadge, { status: req.status })
            ] }),
            req.notes && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: req.notes }),
            req.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: "mt-1 text-xs",
                style: { color: "oklch(0.65 0.18 25)" },
                children: [
                  t("rejectionReason"),
                  ": ",
                  req.rejectionReason
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] text-muted-foreground/60", children: formatDateLocal(req.createdAt) })
          ]
        },
        req.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: t("paymentHistory") }),
      txLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, i)) }) : transactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "portal.transactions_empty_state",
          className: "flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-8 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 32, className: "mb-2 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("noTransactionsYet") })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: transactions.map((tx, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.04 },
          "data-ocid": `portal.transaction.item.${i + 1}`,
          className: "flex items-center justify-between rounded-xl border p-4",
          style: {
            background: "linear-gradient(135deg, oklch(0.16 0.025 245 / 0.6), oklch(0.14 0.02 245 / 0.4))",
            borderColor: "oklch(0.26 0.04 248 / 0.3)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground capitalize", children: tx.kind === "udhar" ? t("credit") : t("collection") }),
              tx.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: tx.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] text-muted-foreground/60", children: formatDateLocal(tx.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-sm font-bold",
                style: {
                  color: tx.kind === "udhar" ? "oklch(0.65 0.2 25)" : "oklch(0.7 0.18 145)"
                },
                children: [
                  tx.kind === "udhar" ? "-" : "+",
                  fmt(tx.amount)
                ]
              }
            )
          ]
        },
        `${tx.kind}-${tx.id}`
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SubmitPaymentModal,
      {
        open: showPaymentModal,
        onClose: () => setShowPaymentModal(false)
      }
    )
  ] });
}
function CustomerPortalPage() {
  const { t } = useAppContext();
  const { data: profile, isLoading } = useGetMyCustomerProfile();
  const isLinked = !!profile && !isLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: t("customerPortal"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 28, className: "animate-spin text-primary" }) }) : isLinked ? /* @__PURE__ */ jsxRuntimeExports.jsx(LinkedDashboard, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(LinkAccountForm, {}) }) });
}
export {
  CustomerPortalPage as default
};
