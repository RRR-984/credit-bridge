import { f as createLucideIcon, b as useAppContext, r as reactExports, K as useAdminGetAllCustomers, M as useAdminBlockCustomer, N as useAdminUnblockCustomer, O as useAdminDeleteCustomer, P as useAdminUpdateCustomer, j as jsxRuntimeExports } from "./index-BMWWyN1B.js";
import { S as StatCard } from "./StatCard-C9rA8YrV.js";
import { B as Badge } from "./badge-BbZTdatT.js";
import { B as Button } from "./button-DKnwwFYJ.js";
import { I as Input } from "./input-BOw1SNUr.js";
import { L as Label } from "./label-CN_OpgFj.js";
import { U as User, S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./sheet-CRIZmFri.js";
import { f as formatCurrency } from "./formatCurrency-B6Vczasl.js";
import { u as ue } from "./index-D_FB4WPP.js";
import { S as Search } from "./search-_UoDyHUW.js";
import { U as Users } from "./users-hQCom-8Y.js";
import { S as ShieldAlert } from "./shield-alert-p8Qr7EyC.js";
import { P as Pencil, T as TriangleAlert } from "./triangle-alert-CoPGBApr.js";
import { L as Lock } from "./lock-bLOx-DzO.js";
import { T as Trash2 } from "./trash-2-SVH_ldvm.js";
import "./x-DiXvMvbW.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
];
const LockOpen = createLucideIcon("lock-open", __iconNode);
function AdminCustomersPage() {
  const { t, selectedCountry } = useAppContext();
  const [search, setSearch] = reactExports.useState("");
  const [editingCustomer, setEditingCustomer] = reactExports.useState(
    null
  );
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const { data: customers = [], isLoading } = useAdminGetAllCustomers();
  const blockMutation = useAdminBlockCustomer();
  const unblockMutation = useAdminUnblockCustomer();
  const deleteMutation = useAdminDeleteCustomer();
  const updateMutation = useAdminUpdateCustomer();
  const filtered = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.mobileNumber.toLowerCase().includes(q)
    );
  }, [customers, search]);
  const totalCustomers = customers.length;
  const blockedCount = customers.filter((c) => c.blocked).length;
  const handleBlock = async (id) => {
    try {
      await blockMutation.mutateAsync(id);
      ue.success(t("customerBlocked"));
    } catch {
      ue.error(t("failedToLoad"));
    }
  };
  const handleUnblock = async (id) => {
    try {
      await unblockMutation.mutateAsync(id);
      ue.success(t("customerUnblocked"));
    } catch {
      ue.error(t("failedToLoad"));
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
      ue.success(t("customerDeleted"));
      setDeleteTarget(null);
    } catch {
      ue.error(t("failedToLoad"));
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingCustomer) return;
    const fd = new FormData(e.currentTarget);
    const args = {
      name: String(fd.get("name") ?? ""),
      mobileNumber: String(fd.get("mobileNumber") ?? ""),
      address: String(fd.get("address") ?? ""),
      creditLimit: BigInt(Number(fd.get("creditLimit") ?? 0)),
      notes: String(fd.get("notes") ?? "")
    };
    try {
      await updateMutation.mutateAsync({ id: editingCustomer.id, args });
      ue.success(t("customerUpdated"));
      setEditingCustomer(null);
    } catch {
      ue.error(t("failedToLoad"));
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground font-display sm:text-2xl", children: t("customerManagement") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:w-72", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-ocid": "admin.customer.search_input",
              placeholder: t("search"),
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "admin.customer.total_customers_card",
            label: t("totalCustomers"),
            value: String(totalCustomers),
            icon: Users,
            iconClassName: "bg-primary/10 text-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            "data-ocid": "admin.customer.blocked_accounts_card",
            label: t("blockedAccounts"),
            value: String(blockedCount),
            icon: ShieldAlert,
            iconClassName: "bg-destructive/10 text-destructive"
          }
        )
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" }) }),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "admin.customer.empty_state",
          className: "flex flex-col items-center justify-center rounded-xl border border-border bg-card py-16 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "mb-3 h-10 w-10 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: t("noCustomers") })
          ]
        }
      ),
      !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden overflow-hidden rounded-xl border border-border bg-card shadow-sm md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("name") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("mobileNumber") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("address") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("outstandingBalance") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("status") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 font-medium text-muted-foreground", children: t("actions") })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: filtered.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            "data-ocid": `admin.customer.item.${idx + 1}`,
            className: "transition-colors hover:bg-muted/30",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: c.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: c.mobileNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "max-w-xs truncate px-4 py-3 text-muted-foreground", children: c.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: formatCurrency(
                Number(c.outstandingBalance),
                selectedCountry.currency.code
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: c.blocked ? "destructive" : "secondary",
                  className: "text-xs",
                  children: c.blocked ? t("blocked") : t("active")
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `admin.customer.edit_button.${idx + 1}`,
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8",
                    onClick: () => setEditingCustomer(c),
                    title: t("editCustomer"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 14 })
                  }
                ),
                c.blocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `admin.customer.unblock_button.${idx + 1}`,
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-green-500 hover:text-green-600",
                    onClick: () => handleUnblock(c.id),
                    disabled: unblockMutation.isPending,
                    title: t("unblockCustomer"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { size: 14 })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `admin.customer.block_button.${idx + 1}`,
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-amber-500 hover:text-amber-600",
                    onClick: () => handleBlock(c.id),
                    disabled: blockMutation.isPending,
                    title: t("blockCustomer"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 14 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    "data-ocid": `admin.customer.delete_button.${idx + 1}`,
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-destructive hover:text-destructive",
                    onClick: () => setDeleteTarget(c),
                    title: t("deleteCustomer"),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                  }
                )
              ] }) })
            ]
          },
          c.id.toString()
        )) })
      ] }) }),
      !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 md:hidden", children: filtered.map((c, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": `admin.customer.item.${idx + 1}`,
          className: "glass-card rounded-xl border border-border p-4",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: c.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: c.blocked ? "destructive" : "secondary",
                    className: "text-[10px]",
                    children: c.blocked ? t("blocked") : t("active")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: c.mobileNumber }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-xs text-muted-foreground", children: c.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm font-bold text-foreground", children: formatCurrency(
                Number(c.outstandingBalance),
                selectedCountry.currency.code
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": `admin.customer.edit_button.${idx + 1}`,
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8",
                  onClick: () => setEditingCustomer(c),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 14 })
                }
              ),
              c.blocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": `admin.customer.unblock_button.${idx + 1}`,
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-green-500",
                  onClick: () => handleUnblock(c.id),
                  disabled: unblockMutation.isPending,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { size: 14 })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": `admin.customer.block_button.${idx + 1}`,
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-amber-500",
                  onClick: () => handleBlock(c.id),
                  disabled: blockMutation.isPending,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 14 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": `admin.customer.delete_button.${idx + 1}`,
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-8 w-8 text-destructive",
                  onClick: () => setDeleteTarget(c),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 })
                }
              )
            ] })
          ] })
        },
        c.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Sheet,
      {
        open: !!editingCustomer,
        onOpenChange: () => setEditingCustomer(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { className: "w-full sm:max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "font-display", children: t("editCustomer") }) }),
          editingCustomer && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdate, className: "mt-6 flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", children: t("name") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "admin.customer.edit_name_input",
                  id: "edit-name",
                  name: "name",
                  defaultValue: editingCustomer.name,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-mobile", children: t("mobileNumber") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "admin.customer.edit_mobile_input",
                  id: "edit-mobile",
                  name: "mobileNumber",
                  defaultValue: editingCustomer.mobileNumber,
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-address", children: t("address") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "admin.customer.edit_address_input",
                  id: "edit-address",
                  name: "address",
                  defaultValue: editingCustomer.address
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-limit", children: t("creditLimit") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "admin.customer.edit_credit_limit_input",
                  id: "edit-limit",
                  name: "creditLimit",
                  type: "number",
                  defaultValue: Number(editingCustomer.creditLimit),
                  required: true
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-notes", children: t("notes") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  "data-ocid": "admin.customer.edit_notes_input",
                  id: "edit-notes",
                  name: "notes",
                  defaultValue: editingCustomer.notes
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "admin.customer.edit_save_button",
                  type: "submit",
                  className: "flex-1",
                  disabled: updateMutation.isPending,
                  children: updateMutation.isPending ? t("saving") : t("save")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  "data-ocid": "admin.customer.edit_cancel_button",
                  type: "button",
                  variant: "outline",
                  className: "flex-1",
                  onClick: () => setEditingCustomer(null),
                  children: t("cancel")
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "admin.customer.delete_dialog",
        className: "w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-lg",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5 text-destructive" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: t("areYouSureDelete") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("cannotBeUndone") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "admin.customer.delete_confirm_button",
                type: "button",
                variant: "destructive",
                className: "flex-1",
                disabled: deleteMutation.isPending,
                onClick: () => handleDelete(deleteTarget.id),
                children: deleteMutation.isPending ? t("loading") : t("confirm")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "admin.customer.delete_cancel_button",
                type: "button",
                variant: "outline",
                className: "flex-1",
                onClick: () => setDeleteTarget(null),
                children: t("cancel")
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  AdminCustomersPage as default
};
