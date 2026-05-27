import { f as createLucideIcon, a as useNavigate, b as useAppContext, r as reactExports, G as useAdminGetAllUdhar, H as useAdminGetAllJama, X as useAdminDeleteUdhar, Y as useAdminDeleteJama, j as jsxRuntimeExports, z as LoaderCircle, o as motion } from "./index-BMWWyN1B.js";
import { f as formatCurrency, a as formatDate } from "./formatCurrency-B6Vczasl.js";
import { S as Search } from "./search-_UoDyHUW.js";
import { T as Trash2 } from "./trash-2-SVH_ldvm.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function AdminTransactionsPage() {
  const navigate = useNavigate();
  const { t, selectedCountry } = useAppContext();
  const [filter, setFilter] = reactExports.useState("All");
  const [search, setSearch] = reactExports.useState("");
  const [confirmId, setConfirmId] = reactExports.useState(null);
  const { data: udharList = [], isLoading: udharLoading } = useAdminGetAllUdhar();
  const { data: jamaList = [], isLoading: jamaLoading } = useAdminGetAllJama();
  const delUdhar = useAdminDeleteUdhar();
  const delJama = useAdminDeleteJama();
  const loading = udharLoading || jamaLoading;
  const txs = reactExports.useMemo(() => {
    const u = udharList.map((x) => ({
      id: x.id,
      type: "Credit",
      amount: typeof x.amount === "bigint" ? Number(x.amount) : x.amount,
      description: x.description ?? "",
      createdAt: x.createdAt
    }));
    const j = jamaList.map((x) => ({
      id: x.id,
      type: "Collection",
      amount: typeof x.amount === "bigint" ? Number(x.amount) : x.amount,
      description: x.notes ?? "",
      createdAt: x.createdAt
    }));
    return [...u, ...j].sort(
      (a, b) => Number(b.createdAt) - Number(a.createdAt)
    );
  }, [udharList, jamaList]);
  const filtered = reactExports.useMemo(() => {
    let out = txs;
    if (filter !== "All") out = out.filter((x) => x.type === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (x) => x.description.toLowerCase().includes(q) || x.amount.toString().includes(q) || formatCurrency(x.amount, selectedCountry.currency.code).toLowerCase().includes(q)
      );
    }
    return out;
  }, [txs, filter, search, selectedCountry.currency.code]);
  const stats = reactExports.useMemo(() => {
    const creditTxs = txs.filter((x) => x.type === "Credit");
    const collectionTxs = txs.filter((x) => x.type === "Collection");
    return {
      creditCount: creditTxs.length,
      collectionCount: collectionTxs.length,
      creditAmount: creditTxs.reduce((s, x) => s + x.amount, 0),
      collectionAmount: collectionTxs.reduce((s, x) => s + x.amount, 0)
    };
  }, [txs]);
  const fmtDate = (ts) => formatDate(new Date(Number(ts) / 1e6), selectedCountry.dateFormat);
  const handleDelete = (tx) => {
    if (confirmId === tx.id) {
      if (tx.type === "Credit") delUdhar.mutate(tx.id);
      else delJama.mutate(tx.id);
      setConfirmId(null);
    } else {
      setConfirmId(tx.id);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex min-h-screen items-center justify-center bg-background",
        "data-ocid": "admin.transactions.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("loading") })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card sticky top-0 z-30 border-b px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-6xl items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/admin" }),
          className: "flex h-9 w-9 items-center justify-center rounded-lg bg-muted/50 transition-smooth hover:bg-muted",
          "data-ocid": "admin.transactions.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5 text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-foreground sm:text-2xl", children: t("allTransactions") })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MiniStat,
          {
            label: t("credit"),
            value: String(stats.creditCount),
            color: "red"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MiniStat,
          {
            label: t("collection"),
            value: String(stats.collectionCount),
            color: "green"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MiniStat,
          {
            label: t("creditTotal"),
            value: formatCurrency(
              stats.creditAmount,
              selectedCountry.currency.code
            ),
            color: "red"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MiniStat,
          {
            label: t("collectionTotal"),
            value: formatCurrency(
              stats.collectionAmount,
              selectedCountry.currency.code
            ),
            color: "green"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: ["All", "Credit", "Collection"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setFilter(f),
            className: `rounded-lg px-4 py-2 text-sm font-medium transition-smooth ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`,
            "data-ocid": `admin.transactions.filter.${f.toLowerCase()}_tab`,
            children: f === "All" ? t("allTransactions") : f === "Credit" ? t("credit") : t("collection")
          },
          f
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: t("search"),
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "w-full rounded-lg border border-input bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-64",
              "data-ocid": "admin.transactions.search_input"
            }
          )
        ] })
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16",
          "data-ocid": "admin.transactions.empty_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-muted-foreground", children: t("noTransactionsYet") })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden overflow-hidden rounded-xl border border-border sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("dueDate") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("credit") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("creditAmount") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("notes") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("actions") })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((tx, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: "bg-card transition-smooth hover:bg-muted/30",
              "data-ocid": `admin.transactions.item.${idx + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground", children: fmtDate(tx.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: tx.type }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: formatCurrency(
                  tx.amount,
                  selectedCountry.currency.code
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-xs truncate px-4 py-3 text-muted-foreground", children: tx.description || "—" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleDelete(tx),
                    className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-smooth ${confirmId === tx.id ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"}`,
                    "data-ocid": `admin.transactions.delete_button.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                      confirmId === tx.id ? t("confirm") : t("deleteCustomer")
                    ]
                  }
                ) })
              ]
            },
            `${tx.type}-${tx.id}`
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 sm:hidden", children: filtered.map((tx, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: idx * 0.03 },
            className: "glass-sm p-4",
            "data-ocid": `admin.transactions.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: fmtDate(tx.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TypeBadge, { type: tx.type })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-lg font-semibold text-foreground", children: formatCurrency(tx.amount, selectedCountry.currency.code) }),
              tx.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-sm text-muted-foreground", children: tx.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => handleDelete(tx),
                  className: `flex w-full items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition-smooth ${confirmId === tx.id ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"}`,
                  "data-ocid": `admin.transactions.delete_button.mobile.${idx + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                    confirmId === tx.id ? `${t("confirm")} ${t("deleteCustomer")}` : t("deleteCustomer")
                  ]
                }
              )
            ]
          },
          `${tx.type}-${tx.id}`
        )) })
      ] })
    ] })
  ] });
}
function MiniStat({
  label,
  value,
  color
}) {
  const borderMap = {
    red: "border-l-red-500",
    green: "border-l-green-500",
    blue: "border-l-primary",
    amber: "border-l-amber-500"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `glass-sm border-l-4 ${borderMap[color]} p-3`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg font-bold text-foreground", children: value })
  ] });
}
function TypeBadge({ type }) {
  const isCredit = type === "Credit";
  const { t } = useAppContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${isCredit ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`,
      children: isCredit ? t("credit") : t("collection")
    }
  );
}
export {
  AdminTransactionsPage as default
};
