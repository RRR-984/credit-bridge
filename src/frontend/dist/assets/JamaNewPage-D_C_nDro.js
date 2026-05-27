import { f as createLucideIcon, a as useNavigate, q as useSearch, d as useCustomers, v as useCreateJama, r as reactExports, j as jsxRuntimeExports, p as ChevronDown, S as Smartphone } from "./index-BMWWyN1B.js";
import { L as Layout } from "./Layout-BN2H6XNu.js";
import { c as cn, B as Button } from "./button-DKnwwFYJ.js";
import { P as PaymentType } from "./types-BB9eb70p.js";
import { C as ChevronLeft } from "./chevron-left-B0FKxOkN.js";
import { B as Banknote } from "./banknote-DWHt-lJv.js";
import { B as Building2 } from "./building-2-Ddl79rw9.js";
import "./x-DiXvMvbW.js";
import "./users-hQCom-8Y.js";
import "./settings-N4I3tt58.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode);
const PAYMENT_MODES = [
  {
    value: PaymentType.cash,
    label: "Cash",
    icon: Banknote,
    activeClass: "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-500",
    ringClass: "focus-visible:ring-emerald-500"
  },
  {
    value: PaymentType.online,
    label: "Online",
    sublabel: "UPI / NEFT",
    icon: Smartphone,
    activeClass: "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    iconClass: "text-blue-500",
    ringClass: "focus-visible:ring-blue-500"
  },
  {
    value: PaymentType.deposit,
    label: "Deposit",
    sublabel: "Bank",
    icon: Building2,
    activeClass: "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    iconClass: "text-orange-500",
    ringClass: "focus-visible:ring-orange-500"
  }
];
function JamaNewPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const preselectedId = (search == null ? void 0 : search.customerId) ?? "";
  const { data: customers = [], isLoading: customersLoading } = useCustomers();
  const createMutation = useCreateJama();
  const [selectedCustomerId, setSelectedCustomerId] = reactExports.useState(preselectedId);
  const [amount, setAmount] = reactExports.useState("");
  const [paymentMode, setPaymentMode] = reactExports.useState(PaymentType.cash);
  const [notes, setNotes] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [customerSearch, setCustomerSearch] = reactExports.useState("");
  const [dropdownOpen, setDropdownOpen] = reactExports.useState(false);
  const dropdownRef = reactExports.useRef(null);
  const selectedCustomer = customers.find(
    (c) => c.id.toString() === selectedCustomerId
  );
  const filteredCustomers = customers.filter(
    (c) => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.mobileNumber.includes(customerSearch)
  );
  reactExports.useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  function validate() {
    const newErrors = {};
    if (!selectedCustomerId) newErrors.customerId = "Please select a customer";
    if (!amount || Number(amount) < 1)
      newErrors.amount = "Enter a valid amount (min 1)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createMutation.mutateAsync({
        customerId: BigInt(selectedCustomerId),
        amount: BigInt(Math.round(Number(amount))),
        notes,
        paymentType: paymentMode
      });
      navigate({
        to: "/customers/$customerId",
        params: { customerId: selectedCustomerId }
      });
    } catch {
    }
  }
  function handleBack() {
    if (preselectedId) {
      navigate({
        to: "/customers/$customerId",
        params: { customerId: preselectedId }
      });
    } else {
      navigate({ to: "/dashboard" });
    }
  }
  function selectCustomer(c) {
    setSelectedCustomerId(c.id.toString());
    setCustomerSearch("");
    setDropdownOpen(false);
    if (errors.customerId)
      setErrors((prev) => ({ ...prev, customerId: void 0 }));
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: "Record Jama", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: handleBack,
        className: "mb-5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        "data-ocid": "jama_new.back_link",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
          "Back"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Record Jama (Payment)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Enter payment received from customer" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "customer-search-input",
            className: "text-sm font-semibold text-foreground",
            children: [
              "Customer ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: dropdownRef, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              id: "customer-search-input",
              type: "button",
              "aria-haspopup": "listbox",
              "aria-expanded": dropdownOpen,
              onClick: () => setDropdownOpen((v) => !v),
              className: cn(
                "flex h-11 w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm transition-colors",
                errors.customerId ? "border-destructive ring-1 ring-destructive" : "border-input hover:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              ),
              "data-ocid": "jama_new.customer_select",
              disabled: customersLoading,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: selectedCustomer ? "text-foreground" : "text-muted-foreground",
                    children: customersLoading ? "Loading customers…" : selectedCustomer ? `${selectedCustomer.name} · ${selectedCustomer.mobileNumber}` : "Select a customer"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    size: 16,
                    className: "shrink-0 text-muted-foreground"
                  }
                )
              ]
            }
          ),
          dropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Search by name or mobile…",
                value: customerSearch,
                onChange: (e) => setCustomerSearch(e.target.value),
                className: "h-8 w-full rounded-md border border-input bg-background px-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "data-ocid": "jama_new.customer_search_input"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-52 overflow-y-auto py-1", children: filteredCustomers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-3 py-2 text-sm text-muted-foreground", children: "No customers found" }) : filteredCustomers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => selectCustomer(c),
                className: "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-muted focus-visible:bg-muted focus-visible:outline-none",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: c.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-muted-foreground", children: c.mobileNumber })
                  ] }),
                  c.id.toString() === selectedCustomerId && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Check,
                    {
                      size: 14,
                      className: "shrink-0 text-primary"
                    }
                  )
                ]
              }
            ) }, c.id.toString())) })
          ] })
        ] }),
        errors.customerId && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "jama_new.customer_field_error",
            children: errors.customerId
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "amount",
            className: "text-sm font-semibold text-foreground",
            children: [
              "Payment Amount (₹) ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground", children: "₹" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "amount",
              name: "amount",
              type: "number",
              inputMode: "numeric",
              min: "1",
              step: "1",
              value: amount,
              onChange: (e) => {
                setAmount(e.target.value);
                if (errors.amount)
                  setErrors((prev) => ({ ...prev, amount: void 0 }));
              },
              onBlur: () => {
                if (!amount || Number(amount) < 1)
                  setErrors((prev) => ({
                    ...prev,
                    amount: "Enter a valid amount (min 1)"
                  }));
              },
              placeholder: "0",
              className: cn(
                "flex h-11 w-full rounded-lg border bg-background py-2 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
                errors.amount ? "border-destructive ring-1 ring-destructive focus-visible:ring-destructive" : "border-input focus-visible:ring-ring"
              ),
              "data-ocid": "jama_new.amount_input"
            }
          )
        ] }),
        errors.amount && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "jama_new.amount_field_error",
            children: errors.amount
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "p",
          {
            id: "payment-mode-label",
            className: "text-sm font-semibold text-foreground",
            children: [
              "Payment Mode ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            role: "radiogroup",
            "aria-labelledby": "payment-mode-label",
            className: "grid grid-cols-3 gap-2.5",
            "data-ocid": "jama_new.payment_mode_group",
            children: PAYMENT_MODES.map((mode) => {
              const Icon = mode.icon;
              const isActive = paymentMode === mode.value;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setPaymentMode(mode.value),
                  className: cn(
                    "relative flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2",
                    mode.ringClass,
                    isActive ? mode.activeClass : "border-border bg-card text-muted-foreground hover:border-border hover:bg-muted/50"
                  ),
                  "data-ocid": `jama_new.payment_mode.${mode.value}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        size: 22,
                        className: cn(
                          "transition-colors",
                          isActive ? mode.iconClass : "text-muted-foreground"
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-tight", children: mode.label }),
                    mode.sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] leading-none opacity-70", children: mode.sublabel }),
                    isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-2 top-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, strokeWidth: 3 }) })
                  ]
                },
                mode.value
              );
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "notes",
            className: "text-sm font-semibold text-foreground",
            children: [
              "Notes",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-xs font-normal text-muted-foreground", children: "(optional)" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            id: "notes",
            name: "notes",
            rows: 2,
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "e.g. Partial payment, advance, etc.",
            className: "flex w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "jama_new.notes_input"
          }
        )
      ] }),
      createMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive",
          "data-ocid": "jama_new.error_state",
          children: "Failed to record payment. Please try again."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          size: "lg",
          className: "w-full font-semibold",
          "data-ocid": "jama_new.submit_button",
          disabled: createMutation.isPending,
          children: createMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" }),
            "Saving…"
          ] }) : "Record Payment"
        }
      )
    ] })
  ] }) });
}
export {
  JamaNewPage as default
};
