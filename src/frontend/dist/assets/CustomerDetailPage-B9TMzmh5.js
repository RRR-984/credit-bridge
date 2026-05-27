import { f as createLucideIcon, g as useParams, a as useNavigate, b as useAppContext, h as useCustomer, i as useTransactionHistory, k as useUdharByCustomer, l as useJamaByCustomer, m as useDeleteCustomer, n as useUpdateCustomer, r as reactExports, j as jsxRuntimeExports, o as motion, T as TrendingUp, W as Wallet, e as useCreateCustomer, p as ChevronDown } from "./index-BMWWyN1B.js";
import { L as Layout } from "./Layout-BN2H6XNu.js";
import { B as Button } from "./button-DKnwwFYJ.js";
import { I as Input } from "./input-BOw1SNUr.js";
import { U as User, S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle, d as SheetFooter } from "./sheet-CRIZmFri.js";
import { S as Skeleton } from "./skeleton-CZ6kit0I.js";
import { a as formatDate, f as formatCurrency } from "./formatCurrency-B6Vczasl.js";
import { T as TransactionKind, C as CustomerStatus } from "./types-BB9eb70p.js";
import { C as ChevronLeft } from "./chevron-left-B0FKxOkN.js";
import { M as Mail } from "./mail-f1m9OeUl.js";
import { P as Pencil, T as TriangleAlert } from "./triangle-alert-CoPGBApr.js";
import { C as CreditCard } from "./credit-card-DCYf8UVt.js";
import { T as Trash2 } from "./trash-2-SVH_ldvm.js";
import { A as ArrowDownLeft, a as ArrowUpRight } from "./arrow-up-right-CooAFxsX.js";
import "./x-DiXvMvbW.js";
import "./users-hQCom-8Y.js";
import "./settings-N4I3tt58.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function bigToNum(n) {
  return Number(n);
}
function tsToDate(ts) {
  return new Date(Number(ts) / 1e6);
}
function getRiskLevel(outstanding, totalCredit) {
  if (totalCredit === 0n) return "Low";
  const ratio = Number(outstanding) / Number(totalCredit) * 100;
  if (ratio <= 33) return "Low";
  if (ratio <= 66) return "Medium";
  return "High";
}
const RISK_STYLES = {
  Low: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
  High: "bg-red-500/15 text-red-400 border border-red-500/30"
};
function StatCard({
  label,
  value,
  icon,
  accent = "default",
  ocid
}) {
  const accentClasses = {
    default: "text-primary",
    success: "text-emerald-400",
    destructive: "text-red-400",
    warning: "text-amber-400"
  };
  const bgClasses = {
    default: "bg-primary/10",
    success: "bg-emerald-500/10",
    destructive: "bg-red-500/10",
    warning: "bg-amber-500/10"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "glass-card rounded-xl p-4 flex flex-col gap-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `flex h-7 w-7 items-center justify-center rounded-lg ${bgClasses[accent]}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: accentClasses[accent], children: icon })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-lg font-bold font-display truncate ${accentClasses[accent]}`,
            children: value
          }
        )
      ]
    }
  );
}
function RepaymentBadge({ type }) {
  const { t } = useAppContext();
  if (type === "fixedDaily") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300", children: t("fixedDaily") });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300", children: t("interestLoan") });
}
function FixedDailySummary({
  udhar,
  currencyCode
}) {
  const fmt = (n) => n.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
  const symbol = currencyCode === "INR" ? "₹" : currencyCode === "USD" ? "$" : currencyCode === "GBP" ? "£" : "";
  const prefix = symbol || `${currencyCode} `;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
    prefix,
    fmt(udhar.dailyAmount ?? 0),
    "/day × ",
    Number(udhar.totalDays ?? 0),
    " days =",
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-teal-600 dark:text-teal-400", children: [
      prefix,
      fmt(udhar.totalToCollect ?? 0)
    ] }),
    " | Profit: ",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-teal-600 dark:text-teal-400", children: [
      prefix,
      fmt(udhar.profitAmount ?? 0)
    ] })
  ] });
}
function InterestLoanBreakdown({
  udhar,
  currencyCode
}) {
  const { t } = useAppContext();
  const [expanded, setExpanded] = reactExports.useState(false);
  const fmt = (n) => n.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0
  });
  const symbol = currencyCode === "INR" ? "₹" : currencyCode === "USD" ? "$" : currencyCode === "GBP" ? "£" : "";
  const prefix = symbol || `${currencyCode} `;
  const months = Number(udhar.loanDurationMonths ?? 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setExpanded((v) => !v),
        className: "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "customer_detail.loan_breakdown_toggle",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Rate: ",
            udhar.interestRate ?? 0,
            "%/month × ",
            months,
            " months"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              size: 14,
              className: `transition-transform duration-200 ${expanded ? "rotate-180" : ""}`
            }
          )
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/50 border border-border rounded-lg p-3 mt-2 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2", children: t("repaymentBreakdown") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("totalInterest") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-teal-600 dark:text-teal-400", children: [
          prefix,
          fmt(udhar.totalInterest ?? 0)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("totalPayable") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-teal-600 dark:text-teal-400", children: [
          prefix,
          fmt(udhar.totalPayable ?? 0)
        ] })
      ] }),
      udhar.dailyInstallment != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("dailyInstallment") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-teal-600 dark:text-teal-400", children: [
          prefix,
          fmt(udhar.dailyInstallment)
        ] })
      ] }),
      udhar.monthlyInstallment != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("monthlyInstallment") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-teal-600 dark:text-teal-400", children: [
          prefix,
          fmt(udhar.monthlyInstallment)
        ] })
      ] }),
      udhar.quarterlyInstallment != null && months >= 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("quarterlyInstallment") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-teal-600 dark:text-teal-400", children: [
          prefix,
          fmt(udhar.quarterlyInstallment)
        ] })
      ] }),
      udhar.halfYearlyInstallment != null && months >= 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("halfYearlyInstallment") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-teal-600 dark:text-teal-400", children: [
          prefix,
          fmt(udhar.halfYearlyInstallment)
        ] })
      ] })
    ] })
  ] });
}
function LedgerRow({
  date,
  kind,
  description,
  amount,
  runningBalance,
  index,
  udharEntry,
  currencyCode
}) {
  const isCredit = kind === TransactionKind.udhar;
  const repType = udharEntry == null ? void 0 : udharEntry.repaymentType;
  const statusClass = isCredit ? "status-badge status-badge-processing" : "status-badge status-badge-success";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.04, duration: 0.3 },
      "data-ocid": `customer_detail.transaction.item.${index + 1}`,
      className: `transaction-card ${isCredit ? "transaction-card-dr" : "transaction-card-cr"} rounded-xl p-4 mb-3`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-sm ${isCredit ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"}`,
            children: isCredit ? "Dr" : "Cr"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: statusClass, children: isCredit ? "CREDIT" : "COLLECTION" }),
              isCredit && (repType === "fixedDaily" || repType === "interestLoan") && /* @__PURE__ */ jsxRuntimeExports.jsx(RepaymentBadge, { type: repType })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "p",
              {
                className: `text-base font-bold font-display shrink-0 ${isCredit ? "text-red-600 dark:text-red-400" : "text-emerald-700 dark:text-emerald-300"}`,
                children: [
                  isCredit ? "-" : "+",
                  amount
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: description || (isCredit ? "Credit issued" : "Collection received") }),
          isCredit && udharEntry && repType === "fixedDaily" && /* @__PURE__ */ jsxRuntimeExports.jsx(FixedDailySummary, { udhar: udharEntry, currencyCode }),
          isCredit && udharEntry && repType === "interestLoan" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            InterestLoanBreakdown,
            {
              udhar: udharEntry,
              currencyCode
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: date }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
              "Bal:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: runningBalance })
            ] })
          ] })
        ] })
      ] })
    }
  );
}
function CustomerDetailPage() {
  const { customerId } = useParams({ strict: false });
  const id = customerId === "new" ? void 0 : BigInt(customerId);
  const navigate = useNavigate();
  const { selectedCountry } = useAppContext();
  const currencyCode = selectedCountry.currency.code;
  const dateFormat = selectedCountry.dateFormat;
  const { data: customer, isLoading } = useCustomer(id);
  const { data: transactions = [], isLoading: txLoading } = useTransactionHistory(id);
  const { data: udharList = [] } = useUdharByCustomer(id);
  const { data: jamaList = [] } = useJamaByCustomer(id);
  const deleteMutation = useDeleteCustomer();
  const updateMutation = useUpdateCustomer();
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [editData, setEditData] = reactExports.useState({
    name: "",
    mobileNumber: "",
    address: "",
    notes: "",
    creditLimit: "",
    email: ""
  });
  const [emailError, setEmailError] = reactExports.useState("");
  function openEdit() {
    if (!customer) return;
    setEditData({
      name: customer.name,
      mobileNumber: customer.mobileNumber,
      address: customer.address ?? "",
      notes: customer.notes ?? "",
      creditLimit: customer.creditLimit.toString(),
      email: customer.email ?? ""
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
  const outstandingBalance = customer ? bigToNum(customer.outstandingBalance) : totalCredit - totalCollection;
  const nextDueDateRaw = udharList.filter((u) => u.dueDate).map((u) => u.dueDate).sort((a, b) => a < b ? -1 : 1)[0];
  const nextDueDate = nextDueDateRaw ? formatDate(tsToDate(nextDueDateRaw), dateFormat) : "N/A";
  const riskLevel = getRiskLevel(
    BigInt(Math.round(outstandingBalance)),
    BigInt(Math.round(totalCredit))
  );
  let runningBal = 0;
  const sortedTx = [...transactions].sort(
    (a, b) => Number(a.createdAt) - Number(b.createdAt)
  );
  const ledgerRows = sortedTx.map((tx) => {
    const amt = bigToNum(tx.amount);
    if (tx.kind === TransactionKind.udhar) {
      runningBal += amt;
    } else {
      runningBal -= amt;
    }
    return { tx, runningBal };
  }).reverse();
  if (customerId === "new") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "New Customer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/customers" }),
          className: "mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "customer_detail.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
            " Customers"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NewCustomerForm, {})
    ] }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl space-y-4 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-28" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-36 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-2xl" })
    ] }) });
  }
  if (!customer) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 28, className: "text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold mb-1", children: "Customer not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "This customer may have been deleted." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          size: "sm",
          onClick: () => navigate({ to: "/customers" }),
          children: "Back to Customers"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { title: customer.name, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-xl px-4 pb-28 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/customers" }),
          className: "flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors pt-2",
          "data-ocid": "customer_detail.back_link",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
            " Customers"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          "data-ocid": "customer_detail.card",
          className: "glass-card rounded-2xl p-5",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 ring-2 ring-primary/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 24, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${customer.status === CustomerStatus.overdue ? "bg-red-500" : "bg-emerald-500"}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground truncate", children: customer.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 11, className: "text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: customer.mobileNumber })
                ] }),
                customer.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MapPin,
                    {
                      size: 11,
                      className: "text-muted-foreground shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: customer.address })
                ] }),
                customer.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Mail,
                    {
                      size: 11,
                      className: "text-muted-foreground shrink-0"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate", children: customer.email })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": "Edit customer",
                  "data-ocid": "customer_detail.edit_button",
                  onClick: openEdit,
                  className: "flex h-8 w-8 items-center justify-center rounded-full bg-muted/60 text-muted-foreground hover:bg-primary/15 hover:text-primary transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 13 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${RISK_STYLES[riskLevel]}`,
                  "data-ocid": "customer_detail.risk_badge",
                  children: [
                    riskLevel === "High" && /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 10 }),
                    riskLevel,
                    " Risk"
                  ]
                }
              )
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.08 },
          className: "grid grid-cols-2 gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Credit",
                value: formatCurrency(totalCredit, currencyCode),
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14 }),
                accent: "default",
                ocid: "customer_detail.stat_total_credit"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Total Collection",
                value: formatCurrency(totalCollection, currencyCode),
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { size: 14 }),
                accent: "success",
                ocid: "customer_detail.stat_total_collection"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Outstanding Balance",
                value: formatCurrency(outstandingBalance, currencyCode),
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 14 }),
                accent: outstandingBalance > 0 ? "destructive" : "success",
                ocid: "customer_detail.stat_outstanding"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatCard,
              {
                label: "Next Due Date",
                value: nextDueDate,
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 14 }),
                accent: nextDueDate !== "N/A" ? "warning" : "default",
                ocid: "customer_detail.stat_due_date"
              }
            )
          ]
        }
      ),
      customer.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.12 },
          className: "glass-sm rounded-xl px-4 py-3 flex items-start gap-3",
          "data-ocid": "customer_detail.notes",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FileText,
              {
                size: 15,
                className: "text-muted-foreground shrink-0 mt-0.5"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1", children: "Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed", children: customer.notes })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.16 },
          "data-ocid": "customer_detail.ledger",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 13 }),
                "Transaction Ledger"
              ] }),
              transactions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                transactions.length,
                " entries"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl overflow-hidden p-3", children: txLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-lg" }, i)) }) : ledgerRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "customer_detail.transactions.empty_state",
                className: "py-14 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 20, className: "text-muted-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "No transactions yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Credit or collection entries will appear here." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1", children: ledgerRows.map(({ tx, runningBal: bal }, i) => {
              const matchedUdhar = tx.kind === TransactionKind.udhar ? udharList.find((u) => u.id === tx.id) : void 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                LedgerRow,
                {
                  index: i,
                  date: formatDate(tsToDate(tx.createdAt), dateFormat),
                  kind: tx.kind,
                  description: tx.description,
                  amount: formatCurrency(bigToNum(tx.amount), currencyCode),
                  runningBalance: formatCurrency(bal, currencyCode),
                  udharEntry: matchedUdhar,
                  currencyCode
                },
                tx.id.toString()
              );
            }) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-destructive/30 bg-destructive/5 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm font-medium text-destructive", children: "Danger Zone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "destructive",
            size: "sm",
            type: "button",
            "data-ocid": "customer_detail.delete_button",
            onClick: handleDelete,
            disabled: deleteMutation.isPending,
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }),
              deleteMutation.isPending ? "Deleting..." : "Delete Customer"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "fixed bottom-6 left-0 right-0 flex justify-center gap-3 px-4 z-30 pointer-events-none",
        "data-ocid": "customer_detail.quick_actions",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              className: "pointer-events-auto gap-2 rounded-full px-5 shadow-lg border-emerald-500/40 text-emerald-400 bg-card/80 backdrop-blur-sm hover:bg-emerald-500/10 hover:border-emerald-500/60 transition-all",
              "data-ocid": "customer_detail.collection_button",
              onClick: () => navigate({
                to: "/jama/new",
                search: { customerId: customer.id.toString() }
              }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { size: 15 }),
                "Add Collection"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              className: "pointer-events-auto gap-2 rounded-full px-5 shadow-lg bg-primary hover:bg-primary/90 transition-all",
              "data-ocid": "customer_detail.credit_button",
              onClick: () => navigate({
                to: "/udhar/new",
                search: { customerId: customer.id.toString() }
              }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 15 }),
                "Add Credit"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: editOpen, onOpenChange: setEditOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "bottom", className: "max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Edit Customer" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: async (e) => {
            e.preventDefault();
            if (!customer) return;
            if (editData.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(editData.email)) {
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
                email: editData.email || void 0
              }
            });
            setEditOpen(false);
          },
          className: "space-y-3 py-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "edit-name",
                  className: "text-sm font-medium text-foreground",
                  children: "Customer Name *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-name",
                  required: true,
                  placeholder: "e.g. Ramesh Kumar",
                  value: editData.name,
                  onChange: (e) => setEditData((p) => ({ ...p, name: e.target.value })),
                  "data-ocid": "customer_detail.edit_name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "edit-mobile",
                  className: "text-sm font-medium text-foreground",
                  children: "Mobile Number *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-mobile",
                  required: true,
                  placeholder: "9876543210",
                  value: editData.mobileNumber,
                  onChange: (e) => setEditData((p) => ({ ...p, mobileNumber: e.target.value })),
                  "data-ocid": "customer_detail.edit_mobile_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "edit-address",
                  className: "text-sm font-medium text-foreground",
                  children: "Address"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-address",
                  placeholder: "House no, Street, City",
                  value: editData.address,
                  onChange: (e) => setEditData((p) => ({ ...p, address: e.target.value })),
                  "data-ocid": "customer_detail.edit_address_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "edit-limit",
                  className: "text-sm font-medium text-foreground",
                  children: "Credit Limit"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-limit",
                  type: "number",
                  min: "0",
                  placeholder: "5000",
                  value: editData.creditLimit,
                  onChange: (e) => setEditData((p) => ({ ...p, creditLimit: e.target.value })),
                  "data-ocid": "customer_detail.edit_credit_limit_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "edit-notes",
                  className: "text-sm font-medium text-foreground",
                  children: "Notes"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-notes",
                  placeholder: "Optional notes",
                  value: editData.notes,
                  onChange: (e) => setEditData((p) => ({ ...p, notes: e.target.value })),
                  "data-ocid": "customer_detail.edit_notes_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "edit-email",
                  className: "text-sm font-medium text-foreground",
                  children: [
                    "Email Address",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "(optional)" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-email",
                  type: "email",
                  placeholder: "customer@example.com",
                  value: editData.email,
                  onChange: (e) => {
                    setEmailError("");
                    setEditData((p) => ({ ...p, email: e.target.value }));
                  },
                  "data-ocid": "customer_detail.edit_email_input"
                }
              ),
              emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "customer_detail.edit_email_field_error",
                  children: emailError
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetFooter, { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                "data-ocid": "customer_detail.edit_submit_button",
                disabled: updateMutation.isPending,
                children: updateMutation.isPending ? "Saving..." : "Save Changes"
              }
            ) })
          ]
        }
      )
    ] }) })
  ] });
}
function NewCustomerForm() {
  const createMutation = useCreateCustomer();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = fd.get("email") || void 0;
    await createMutation.mutateAsync({
      name: fd.get("name"),
      mobileNumber: fd.get("mobile"),
      address: fd.get("address"),
      notes: fd.get("notes"),
      creditLimit: BigInt(fd.get("creditLimit") || "0"),
      email
    });
    navigate({ to: "/customers" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "New Customer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerFormFields, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "submit",
        className: "w-full",
        "data-ocid": "new_customer.submit_button",
        disabled: createMutation.isPending,
        children: createMutation.isPending ? "Saving..." : "Save Customer"
      }
    )
  ] });
}
function CustomerFormFields() {
  const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "text-sm font-medium text-foreground", children: "Customer Name *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "name",
          name: "name",
          required: true,
          placeholder: "e.g. Ramesh Kumar",
          className: inputClass,
          "data-ocid": "new_customer.name_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "mobile", className: "text-sm font-medium text-foreground", children: "Mobile Number *" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "mobile",
          name: "mobile",
          required: true,
          placeholder: "9876543210",
          className: inputClass,
          "data-ocid": "new_customer.mobile_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "address",
          className: "text-sm font-medium text-foreground",
          children: "Address"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "address",
          name: "address",
          placeholder: "House no, Street, City",
          className: inputClass,
          "data-ocid": "new_customer.address_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "creditLimit",
          className: "text-sm font-medium text-foreground",
          children: "Credit Limit"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "creditLimit",
          name: "creditLimit",
          type: "number",
          min: "0",
          placeholder: "5000",
          className: inputClass,
          "data-ocid": "new_customer.credit_limit_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "notes", className: "text-sm font-medium text-foreground", children: "Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "notes",
          name: "notes",
          placeholder: "Optional notes",
          className: inputClass,
          "data-ocid": "new_customer.notes_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "email", className: "text-sm font-medium text-foreground", children: [
        "Email Address",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "(optional)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: "email",
          name: "email",
          type: "email",
          placeholder: "customer@example.com",
          className: inputClass,
          "data-ocid": "new_customer.email_input"
        }
      )
    ] })
  ] });
}
export {
  CustomerDetailPage as default
};
