import { f as createLucideIcon, b as useAppContext, a as useNavigate, E as useAdminGetAdminPrincipal, F as useAdminGetStats, G as useAdminGetAllUdhar, H as useAdminGetAllJama, r as reactExports, j as jsxRuntimeExports, W as Wallet } from "./index-BMWWyN1B.js";
import { S as StatCard } from "./StatCard-C9rA8YrV.js";
import { B as Badge } from "./badge-BbZTdatT.js";
import { B as Button } from "./button-DKnwwFYJ.js";
import { f as formatCurrency } from "./formatCurrency-B6Vczasl.js";
import { U as Users } from "./users-hQCom-8Y.js";
import { S as ShieldAlert } from "./shield-alert-p8Qr7EyC.js";
import { C as CreditCard } from "./credit-card-DCYf8UVt.js";
import { B as Banknote } from "./banknote-DWHt-lJv.js";
import { C as ChevronRight } from "./chevron-right-DlgQIHL5.js";
import { S as Settings } from "./settings-N4I3tt58.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 3 4 4-4 4", key: "1x1c3m" }],
  ["path", { d: "M20 7H4", key: "zbl0bi" }],
  ["path", { d: "m8 21-4-4 4-4", key: "h9nckh" }],
  ["path", { d: "M4 17h16", key: "g4d7ey" }]
];
const ArrowRightLeft = createLucideIcon("arrow-right-left", __iconNode);
function AdminDashboardPage() {
  const { t, selectedCountry } = useAppContext();
  const navigate = useNavigate();
  const { data: adminPrincipal, isLoading: principalLoading } = useAdminGetAdminPrincipal();
  const { data: stats, isLoading: statsLoading } = useAdminGetStats();
  const { data: allUdhar = [], isLoading: udharLoading } = useAdminGetAllUdhar();
  const { data: allJama = [], isLoading: jamaLoading } = useAdminGetAllJama();
  const isLoading = principalLoading || statsLoading || udharLoading || jamaLoading;
  const outstanding = stats ? Number(stats.totalUdharAmount) - Number(stats.totalJamaAmount) : 0;
  const recentTransactions = reactExports.useMemo(() => {
    const udharTxs = allUdhar.map((u) => ({
      id: `u-${u.id.toString()}`,
      type: "credit",
      amount: Number(u.amount),
      createdAt: Number(u.createdAt)
    }));
    const jamaTxs = allJama.map((j) => ({
      id: `j-${j.id.toString()}`,
      type: "collection",
      amount: Number(j.amount),
      createdAt: Number(j.createdAt)
    }));
    return [...udharTxs, ...jamaTxs].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);
  }, [allUdhar, allJama]);
  if (adminPrincipal === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card w-full max-w-md p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold text-foreground font-display", children: t("adminAccess") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: t("adminSetupDesc") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "admin.dashboard.goto_setup_button",
          type: "button",
          className: "mt-5 w-full",
          onClick: () => navigate({ to: "/admin/setup" }),
          children: t("setAsAdmin")
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground font-display sm:text-2xl", children: t("adminDashboard") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: t("fullSystemControl") })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }),
    !isLoading && stats && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "admin.dashboard.total_customers_card",
            label: t("totalCustomers"),
            value: String(stats.totalCustomers),
            icon: Users,
            iconClassName: "bg-primary/10 text-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "admin.dashboard.total_transactions_card",
            label: t("totalTransactions"),
            value: String(
              Number(stats.totalUdhar) + Number(stats.totalJama)
            ),
            icon: ArrowRightLeft,
            iconClassName: "bg-accent/10 text-accent"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "admin.dashboard.blocked_count_card",
            label: t("blockedCount"),
            value: String(stats.blockedCount),
            icon: ShieldAlert,
            iconClassName: "bg-destructive/10 text-destructive"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "admin.dashboard.outstanding_credit_card",
            label: t("outstandingCredit"),
            value: formatCurrency(
              outstanding,
              selectedCountry.currency.code
            ),
            icon: Wallet,
            iconClassName: "bg-amber-500/10 text-amber-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "admin.dashboard.credit_total_card",
            label: t("totalCreditIssued"),
            value: formatCurrency(
              Number(stats.totalUdharAmount),
              selectedCountry.currency.code
            ),
            icon: CreditCard,
            iconClassName: "bg-primary/10 text-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "admin.dashboard.collection_total_card",
            label: t("totalCollections"),
            value: formatCurrency(
              Number(stats.totalJamaAmount),
              selectedCountry.currency.code
            ),
            icon: Banknote,
            iconClassName: "bg-green-500/10 text-green-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: t("quickActions") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              "data-ocid": "admin.dashboard.manage_customers_button",
              type: "button",
              onClick: () => navigate({ to: "/admin/customers" }),
              className: "glass-card flex items-center justify-between p-4 text-left transition-shadow hover:shadow-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: t("manageCustomers") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("allCustomers") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-muted-foreground" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              "data-ocid": "admin.dashboard.all_transactions_button",
              type: "button",
              onClick: () => navigate({ to: "/admin/transactions" }),
              className: "glass-card flex items-center justify-between p-4 text-left transition-shadow hover:shadow-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: t("allTransactions") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("recentTransactions") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5 text-muted-foreground" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              "data-ocid": "admin.dashboard.settings_button",
              type: "button",
              onClick: () => navigate({ to: "/settings" }),
              className: "glass-card flex items-center justify-between p-4 text-left transition-shadow hover:shadow-md",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: t("settings") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("preferences") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5 text-muted-foreground" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wide text-muted-foreground", children: t("recentTransactions") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "admin.dashboard.view_all_transactions_button",
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: () => navigate({ to: "/admin/transactions" }),
              children: t("viewAll")
            }
          )
        ] }),
        recentTransactions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-8 text-center text-sm text-muted-foreground", children: t("noTransactionsYet") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium text-muted-foreground", children: t("date") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium text-muted-foreground", children: t("transactionType") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 font-medium text-muted-foreground", children: t("amount") })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: recentTransactions.map((tx, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              "data-ocid": `admin.dashboard.tx.item.${idx + 1}`,
              className: "transition-colors hover:bg-muted/30",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-muted-foreground", children: new Date(tx.createdAt).toLocaleDateString() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: tx.type === "credit" ? "default" : "secondary",
                    className: "text-xs",
                    children: tx.type === "credit" ? t("credit") : t("collection")
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-semibold text-foreground", children: formatCurrency(
                  tx.amount,
                  selectedCountry.currency.code
                ) })
              ]
            },
            tx.id
          )) })
        ] }) })
      ] })
    ] })
  ] }) });
}
export {
  AdminDashboardPage as default
};
