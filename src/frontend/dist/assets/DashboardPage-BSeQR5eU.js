import { u as useDashboardStats, a as useNavigate, b as useAppContext, c as useOwnerGetPendingPaymentRequests, j as jsxRuntimeExports, L as Link, C as CircleAlert, W as Wallet, T as TrendingUp } from "./index-BOlz_vt-.js";
import { F as FloatingActionButton } from "./FloatingActionButton-mtWzd7Bc.js";
import { L as Layout, C as Clock } from "./Layout-COj8nO6b.js";
import { S as StatCard } from "./StatCard-D8siFDh7.js";
import { B as Button } from "./button-C2O8Pd5v.js";
import { S as Skeleton } from "./skeleton-B0KK6qX6.js";
import { f as formatCurrency } from "./formatCurrency-B6Vczasl.js";
import { A as ArrowDownLeft, a as ArrowUpRight } from "./arrow-up-right-COfzHNXt.js";
import { U as Users } from "./users-DI-Z_r66.js";
import { C as ChevronRight } from "./chevron-right-Dm6hCSEl.js";
import "./user-plus-DQVGmE4d.js";
import "./x-BeJ_vxcM.js";
import "./settings-CQ8RcIP4.js";
function DashboardPage() {
  const { data: stats, isLoading, isError } = useDashboardStats();
  const navigate = useNavigate();
  const { t, selectedCountry } = useAppContext();
  const currency = selectedCountry.currency;
  const { data: pendingRequests } = useOwnerGetPendingPaymentRequests();
  const fmt = (n) => formatCurrency(Number(n), currency.code);
  const hasPendingBalance = stats && Number(stats.pendingBalance) > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { title: "Dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Business Dashboard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your credit & collection overview" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              type: "button",
              onClick: () => navigate({ to: "/jama/new" }),
              "data-ocid": "dashboard.collection_button",
              className: "gap-1 text-accent border-accent/40 hover:bg-accent/10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownLeft, { size: 14 }),
                " Collection"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              type: "button",
              onClick: () => navigate({ to: "/udhar/new" }),
              "data-ocid": "dashboard.credit_button",
              className: "gap-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14 }),
                " Credit"
              ]
            }
          )
        ] })
      ] }),
      pendingRequests && pendingRequests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "dashboard.pending_approvals_alert",
          className: "mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 20, className: "text-amber-500 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-amber-600 dark:text-amber-400", children: [
                pendingRequests.length,
                " payment",
                " ",
                pendingRequests.length === 1 ? "request" : "requests",
                " pending your approval"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/pending-approvals",
                "data-ocid": "dashboard.review_pending_link",
                className: "text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline whitespace-nowrap",
                children: "Review Now →"
              }
            )
          ]
        }
      ),
      isError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "dashboard.error_state",
          className: "flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 18, className: "flex-shrink-0 text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: "Failed to load dashboard data. Please try again." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl col-span-2 sm:col-span-1" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "dashboard.total_credit_card",
            label: t("totalCredit"),
            value: stats ? fmt(stats.totalUdhar) : fmt(0),
            icon: ArrowUpRight,
            iconClassName: "bg-destructive/10 text-destructive",
            className: "glass-card border-destructive/20"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "dashboard.total_collection_card",
            label: t("totalCollection"),
            value: stats ? fmt(stats.totalJama) : fmt(0),
            icon: ArrowDownLeft,
            iconClassName: "bg-accent/10 text-accent",
            valueClassName: "text-accent",
            className: "glass-card border-accent/20"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "dashboard.outstanding_balance_card",
            label: t("outstandingBalance"),
            value: stats ? fmt(stats.pendingBalance) : fmt(0),
            icon: Wallet,
            iconClassName: hasPendingBalance ? "bg-amber-500/10 text-amber-500" : "bg-primary/10 text-primary",
            valueClassName: hasPendingBalance ? "text-amber-500" : void 0,
            badge: hasPendingBalance ? "Overdue" : void 0,
            className: "glass-card border-amber-500/20"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "dashboard.overdue_card",
            label: "Overdue Customers",
            value: stats ? String(Number(stats.overdueCustomerCount)) : "0",
            icon: CircleAlert,
            iconClassName: stats && stats.overdueCustomerCount > 0n ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground",
            valueClassName: stats && stats.overdueCustomerCount > 0n ? "text-destructive" : void 0,
            className: "glass-card"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "dashboard.today_collection_card",
            label: t("todaysCollection"),
            value: stats ? fmt(stats.todayCollection) : fmt(0),
            icon: TrendingUp,
            iconClassName: "bg-primary/10 text-primary",
            className: "col-span-2 sm:col-span-1 glass-card border-primary/20"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: "Top Pending Customers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "dashboard.view_all_customers_button",
              onClick: () => navigate({ to: "/customers" }),
              className: "text-xs font-medium text-primary transition-colors hover:text-primary/80",
              children: "View All →"
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 border-b border-border px-4 py-3 last:border-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1 rounded" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 rounded" })
            ]
          },
          i
        )) }) : stats && stats.top5CustomersByBalance.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border glass-card", children: stats.top5CustomersByBalance.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `dashboard.top_customer.item.${i + 1}`,
            className: "flex w-full cursor-pointer items-center gap-3 border-b border-border/50 px-4 py-3 last:border-0 transition-colors hover:bg-primary/5",
            onClick: () => navigate({
              to: "/customers/$customerId",
              params: { customerId: c.id.toString() }
            }),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 15, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "#",
                  i + 1,
                  " highest pending"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-shrink-0 items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-amber-500", children: fmt(c.outstandingBalance) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 14, className: "text-muted-foreground" })
              ] })
            ]
          },
          c.id.toString()
        )) }) : !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "dashboard.top_customers_empty_state",
            className: "flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-8 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 32, className: "mb-2 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No customers yet" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "pb-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: "Recent Transactions" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl border border-border bg-card divide-y divide-border", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-3 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-9 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-40 rounded" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24 rounded" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16 rounded" })
        ] }, i)) }) : stats && stats.top5CustomersByBalance.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-8 text-muted-foreground text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "View complete transaction history on each customer's page." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/customers" }),
              className: "text-primary underline mt-1 inline-block",
              children: "Browse Customers"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "dashboard.transactions_empty_state",
            className: "flex flex-col items-center rounded-xl border border-dashed border-border glass-card py-10 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 36, className: "mb-3 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No transactions yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Start by adding a customer and recording a credit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  size: "sm",
                  type: "button",
                  className: "mt-4",
                  "data-ocid": "dashboard.add_customer_button",
                  onClick: () => navigate({ to: "/customers" }),
                  children: "Add Customer"
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingActionButton, {})
  ] });
}
export {
  DashboardPage as default
};
