import { j as jsxRuntimeExports, C as CircleAlert, d as useCustomers, b as useAppContext, r as reactExports, e as useCreateCustomer, a as useNavigate } from "./index-BMWWyN1B.js";
import { B as Badge } from "./badge-BbZTdatT.js";
import { f as formatCurrency } from "./formatCurrency-B6Vczasl.js";
import { c as cn, B as Button } from "./button-DKnwwFYJ.js";
import { C as CustomerStatus } from "./types-BB9eb70p.js";
import { U as User, S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle, d as SheetFooter } from "./sheet-CRIZmFri.js";
import { C as ChevronRight } from "./chevron-right-DlgQIHL5.js";
import { P as Plus, F as FloatingActionButton } from "./FloatingActionButton-DZ69RYHt.js";
import { L as Layout } from "./Layout-BN2H6XNu.js";
import { I as Input } from "./input-BOw1SNUr.js";
import { S as Skeleton } from "./skeleton-CZ6kit0I.js";
import { S as Search } from "./search-_UoDyHUW.js";
import { U as Users } from "./users-hQCom-8Y.js";
import "./x-DiXvMvbW.js";
import "./user-plus-BQUZ1UUN.js";
import "./arrow-up-right-CooAFxsX.js";
import "./settings-N4I3tt58.js";
function CustomerCard({
  name,
  mobileNumber,
  outstandingBalance,
  status,
  currency = "INR",
  onClick,
  className,
  "data-ocid": dataOcid
}) {
  const isOverdue = status === CustomerStatus.overdue;
  const hasPending = outstandingBalance > 0n;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": dataOcid,
      onClick,
      className: cn(
        "glass-card flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border/60 p-4 transition-all hover:border-primary/40 hover:shadow-lg active:scale-[0.99]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: name }),
            isOverdue && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 14, className: "flex-shrink-0 text-destructive" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: mobileNumber })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-shrink-0 flex-col items-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-sm font-bold",
                hasPending ? "text-destructive" : "text-green-500"
              ),
              children: hasPending ? formatCurrency(Math.abs(Number(outstandingBalance)), currency) : "Settled"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: isOverdue ? "destructive" : "secondary",
              className: "text-xs",
              children: isOverdue ? "Overdue" : "Active"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16, className: "flex-shrink-0 text-muted-foreground" })
      ]
    }
  );
}
function CustomersPage() {
  const { data: customers = [], isLoading } = useCustomers();
  const { t, selectedCountry } = useAppContext();
  const [search, setSearch] = reactExports.useState("");
  const [sheetOpen, setSheetOpen] = reactExports.useState(false);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    mobileNumber: "",
    address: "",
    notes: "",
    creditLimit: "",
    email: ""
  });
  const [emailError, setEmailError] = reactExports.useState("");
  const createMutation = useCreateCustomer();
  const navigate = useNavigate();
  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.mobileNumber.includes(search)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { title: t("customers"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: t("customers") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isLoading ? "Loading..." : `${customers.length} customer${customers.length !== 1 ? "s" : ""}` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            type: "button",
            "data-ocid": "customers.add_button",
            onClick: () => setSheetOpen(true),
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
              " ",
              t("addCustomer")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 16,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "search",
            placeholder: "Search by name or mobile...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-9",
            "data-ocid": "customers.search_input"
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" })
      ] }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "customers.empty_state",
          className: "glass-card flex flex-col items-center rounded-xl border border-dashed border-border py-14 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 40, className: "mb-3 text-muted-foreground/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: search ? "No results found" : t("noCustomers") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: search ? "Try a different search" : "Add your first customer to get started" }),
            !search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                type: "button",
                className: "mt-4",
                "data-ocid": "customers.empty_add_button",
                onClick: () => setSheetOpen(true),
                children: t("addCustomer")
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 pb-20 md:pb-4", children: filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CustomerCard,
        {
          id: c.id,
          name: c.name,
          mobileNumber: c.mobileNumber,
          outstandingBalance: c.outstandingBalance,
          status: c.status,
          currency: selectedCountry.currency.code,
          "data-ocid": `customers.item.${i + 1}`,
          onClick: () => navigate({
            to: "/customers/$customerId",
            params: { customerId: c.id.toString() }
          })
        },
        c.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: sheetOpen, onOpenChange: setSheetOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "bottom", className: "max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: t("addCustomer") }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: async (e) => {
            e.preventDefault();
            if (formData.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
              setEmailError("Invalid email format");
              return;
            }
            setEmailError("");
            await createMutation.mutateAsync({
              name: formData.name,
              mobileNumber: formData.mobileNumber,
              address: formData.address,
              notes: formData.notes,
              creditLimit: BigInt(formData.creditLimit || "0")
            });
            setFormData({
              name: "",
              mobileNumber: "",
              address: "",
              notes: "",
              creditLimit: "",
              email: ""
            });
            setEmailError("");
            setSheetOpen(false);
          },
          className: "space-y-3 py-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "cs-name",
                  className: "text-sm font-medium text-foreground",
                  children: "Customer Name *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cs-name",
                  required: true,
                  placeholder: "e.g. Ramesh Kumar",
                  value: formData.name,
                  onChange: (e) => setFormData((p) => ({ ...p, name: e.target.value })),
                  "data-ocid": "customers.add_name_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "cs-mobile",
                  className: "text-sm font-medium text-foreground",
                  children: "Mobile Number *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cs-mobile",
                  required: true,
                  placeholder: "9876543210",
                  value: formData.mobileNumber,
                  onChange: (e) => setFormData((p) => ({ ...p, mobileNumber: e.target.value })),
                  "data-ocid": "customers.add_mobile_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "cs-address",
                  className: "text-sm font-medium text-foreground",
                  children: "Address"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cs-address",
                  placeholder: "House no, Street, City",
                  value: formData.address,
                  onChange: (e) => setFormData((p) => ({ ...p, address: e.target.value })),
                  "data-ocid": "customers.add_address_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "cs-limit",
                  className: "text-sm font-medium text-foreground",
                  children: [
                    "Credit Limit (",
                    selectedCountry.currency.symbol,
                    ")"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cs-limit",
                  type: "number",
                  min: "0",
                  placeholder: "5000",
                  value: formData.creditLimit,
                  onChange: (e) => setFormData((p) => ({ ...p, creditLimit: e.target.value })),
                  "data-ocid": "customers.add_credit_limit_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "cs-notes",
                  className: "text-sm font-medium text-foreground",
                  children: "Notes"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cs-notes",
                  placeholder: "Optional notes",
                  value: formData.notes,
                  onChange: (e) => setFormData((p) => ({ ...p, notes: e.target.value })),
                  "data-ocid": "customers.add_notes_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "cs-email",
                  className: "text-sm font-medium text-foreground",
                  children: [
                    t("emailAddress"),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: t("optional") })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "cs-email",
                  type: "email",
                  placeholder: "customer@example.com",
                  value: formData.email,
                  onChange: (e) => {
                    setEmailError("");
                    setFormData((p) => ({ ...p, email: e.target.value }));
                  },
                  "data-ocid": "customers.add_email_input"
                }
              ),
              emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "customers.add_email_field_error",
                  children: emailError
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetFooter, { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                "data-ocid": "customers.add_submit_button",
                disabled: createMutation.isPending,
                children: createMutation.isPending ? "Saving..." : `${t("save")} Customer`
              }
            ) })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingActionButton, {})
  ] });
}
export {
  CustomersPage as default
};
