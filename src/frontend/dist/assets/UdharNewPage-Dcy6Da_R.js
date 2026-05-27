import { f as createLucideIcon, a as useNavigate, q as useSearch, b as useAppContext, d as useCustomers, s as useCreateUdhar, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, o as motion, t as translate } from "./index-BMWWyN1B.js";
import { L as Layout } from "./Layout-BN2H6XNu.js";
import { B as Button } from "./button-DKnwwFYJ.js";
import { u as ue } from "./index-D_FB4WPP.js";
import { C as ChevronLeft } from "./chevron-left-B0FKxOkN.js";
import { S as Search } from "./search-_UoDyHUW.js";
import { B as Banknote } from "./banknote-DWHt-lJv.js";
import "./x-DiXvMvbW.js";
import "./users-hQCom-8Y.js";
import "./settings-N4I3tt58.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
];
const ChevronsUpDown = createLucideIcon("chevrons-up-down", __iconNode);
const REPAYMENT_MODES = [
  { value: "endOfTerm", labelKey: "endOfTerm" },
  { value: "monthly", labelKey: "monthly" },
  { value: "quarterly", labelKey: "quarterly" },
  { value: "halfYearly", labelKey: "halfYearly" },
  { value: "daily", labelKey: "daily" }
];
function UdharNewPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const preselectedId = (search == null ? void 0 : search.customerId) ?? "";
  const { language } = useAppContext();
  const t = (key) => translate(language, key);
  const { data: customers = [], isLoading: customersLoading } = useCustomers();
  const createMutation = useCreateUdhar();
  const [selectedCustomerId, setSelectedCustomerId] = reactExports.useState(preselectedId);
  const [amount, setAmount] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [dueDate, setDueDate] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const [repaymentType, setRepaymentType] = reactExports.useState("simple");
  const [dailyAmount, setDailyAmount] = reactExports.useState("");
  const [totalDays, setTotalDays] = reactExports.useState("");
  const [interestRate, setInterestRate] = reactExports.useState("");
  const [loanDuration, setLoanDuration] = reactExports.useState("");
  const [repaymentMode, setRepaymentMode] = reactExports.useState("endOfTerm");
  const [customerSearch, setCustomerSearch] = reactExports.useState("");
  const [dropdownOpen, setDropdownOpen] = reactExports.useState(false);
  const dropdownRef = reactExports.useRef(null);
  const selectedCustomer = customers.find(
    (c) => c.id.toString() === selectedCustomerId
  );
  reactExports.useEffect(() => {
    if (preselectedId && customers.length > 0) {
      setSelectedCustomerId(preselectedId);
    }
  }, [preselectedId, customers]);
  reactExports.useEffect(() => {
    function handler(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setCustomerSearch("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const filteredCustomers = customers.filter(
    (c) => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.mobileNumber.includes(customerSearch)
  );
  const fixedCalc = reactExports.useMemo(() => {
    const principal = Number(amount) || 0;
    const daily = Number(dailyAmount) || 0;
    const days = Number(totalDays) || 0;
    const total = daily * days;
    const profit = total - principal;
    return { total, profit };
  }, [amount, dailyAmount, totalDays]);
  const loanCalc = reactExports.useMemo(() => {
    const principal = Number(amount) || 0;
    const rate = Number(interestRate) || 0;
    const months = Number(loanDuration) || 0;
    const totalInt = principal * rate * months / 100;
    const totalPay = principal + totalInt;
    const daily = months > 0 ? totalPay / (months * 30) : 0;
    const monthly = months > 0 ? totalPay / months : 0;
    const quarterly = months >= 3 ? totalPay / (months / 3) : null;
    const halfYearly = months >= 6 ? totalPay / (months / 6) : null;
    return { totalInt, totalPay, daily, monthly, quarterly, halfYearly };
  }, [amount, interestRate, loanDuration]);
  function validate() {
    const errs = {};
    if (!selectedCustomerId) errs.customerId = "Please select a customer";
    if (!amount || Number(amount) < 1)
      errs.amount = "Enter a valid amount (minimum 1)";
    if (!description.trim())
      errs.description = "Item / service description is required";
    if (repaymentType === "fixedDaily") {
      if (!dailyAmount || Number(dailyAmount) < 1)
        errs.dailyAmount = "Enter daily collection amount";
      if (!totalDays || Number(totalDays) < 1)
        errs.totalDays = "Enter total number of days";
    }
    if (repaymentType === "interestLoan") {
      if (!interestRate || Number(interestRate) <= 0)
        errs.interestRate = "Enter valid interest rate";
      if (!loanDuration || Number(loanDuration) < 1)
        errs.loanDuration = "Enter loan duration in months";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    const dueTimestamp = dueDate ? BigInt(new Date(dueDate).getTime()) * 1000000n : void 0;
    const baseArgs = {
      customerId: BigInt(selectedCustomerId),
      amount: BigInt(Math.round(Number(amount))),
      description: description.trim(),
      notes: notes.trim(),
      dueDate: dueTimestamp,
      repaymentType
    };
    const extraArgs = repaymentType === "fixedDaily" ? {
      dailyAmount: Number(dailyAmount),
      totalDays: BigInt(Math.round(Number(totalDays)))
    } : repaymentType === "interestLoan" ? {
      interestRate: Number(interestRate),
      loanDurationMonths: BigInt(Math.round(Number(loanDuration))),
      repaymentMode
    } : {};
    try {
      const result = await createMutation.mutateAsync({
        ...baseArgs,
        ...extraArgs
      });
      ue.success("Credit entry saved successfully!");
      navigate({
        to: "/customers/$customerId",
        params: { customerId: result.customerId.toString() }
      });
    } catch {
      ue.error("Failed to save credit entry. Please try again.");
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
  const inputCls = (hasErr) => `flex h-11 w-full rounded-lg border ${hasErr ? "border-destructive" : "border-input"} bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors`;
  const fmt = (n) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);
  const repaymentTabs = [
    { key: "simple", label: t("simple") },
    { key: "fixedDaily", label: t("fixedDaily") },
    { key: "interestLoan", label: t("interestLoan") }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { title: t("addCredit"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-lg px-1 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleBack,
          className: "flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary",
          "aria-label": "Go back",
          "data-ocid": "udhar_new.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground", children: t("addCredit") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Record credit given to customer" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-xl border border-border/60 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, noValidate: true, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "customerId",
            className: "text-sm font-semibold text-foreground",
            children: [
              t("customer"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: dropdownRef, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              id: "customerId",
              type: "button",
              onClick: () => {
                setDropdownOpen((o) => !o);
                setCustomerSearch("");
              },
              "aria-haspopup": "listbox",
              "aria-expanded": dropdownOpen,
              className: `flex h-11 w-full items-center justify-between rounded-lg border ${errors.customerId ? "border-destructive" : "border-input"} bg-background px-3 py-2 text-sm transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`,
              "data-ocid": "udhar_new.customer_select",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: selectedCustomer ? "text-foreground" : "text-muted-foreground",
                    children: [
                      customersLoading ? "Loading customers..." : selectedCustomer ? `${selectedCustomer.name} · ${selectedCustomer.mobileNumber}` : t("searchCustomer"),
                      ","
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronsUpDown,
                  {
                    size: 15,
                    className: "shrink-0 text-muted-foreground"
                  }
                )
              ]
            }
          ),
          dropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border px-3 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Search,
                {
                  size: 14,
                  className: "shrink-0 text-muted-foreground"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  placeholder: "Search by name or mobile...",
                  value: customerSearch,
                  onChange: (e) => setCustomerSearch(e.target.value),
                  className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground",
                  "data-ocid": "udhar_new.customer_search_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "max-h-52 overflow-y-auto py-1", children: filteredCustomers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-3 py-3 text-center text-sm text-muted-foreground", children: t("noCustomers") }) : filteredCustomers.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setSelectedCustomerId(c.id.toString());
                  setDropdownOpen(false);
                  setCustomerSearch("");
                  if (errors.customerId)
                    setErrors((p) => ({
                      ...p,
                      customerId: void 0
                    }));
                },
                className: `flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-sm transition-colors hover:bg-muted ${c.id.toString() === selectedCustomerId ? "bg-primary/10 font-medium text-primary" : "text-foreground"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: c.mobileNumber })
                ]
              }
            ) }, c.id.toString())) })
          ] })
        ] }),
        errors.customerId && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "udhar_new.customer_select.field_error",
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
              t("creditAmount"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Banknote,
            {
              size: 15,
              className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "amount",
              name: "amount",
              type: "number",
              min: "1",
              step: "1",
              value: amount,
              onChange: (e) => {
                setAmount(e.target.value);
                if (errors.amount)
                  setErrors((p) => ({ ...p, amount: void 0 }));
              },
              placeholder: "0",
              className: `${inputCls(errors.amount)} pl-8`,
              "data-ocid": "udhar_new.amount_input"
            }
          )
        ] }),
        errors.amount && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "udhar_new.amount_input.field_error",
            children: errors.amount
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "description",
            className: "text-sm font-semibold text-foreground",
            children: [
              t("productService"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "description",
            name: "description",
            value: description,
            onChange: (e) => {
              setDescription(e.target.value);
              if (errors.description)
                setErrors((p) => ({ ...p, description: void 0 }));
            },
            placeholder: "e.g. Rice 5kg, Flour, Monthly groceries",
            className: inputCls(errors.description),
            "data-ocid": "udhar_new.description_input"
          }
        ),
        errors.description && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs text-destructive",
            "data-ocid": "udhar_new.description_input.field_error",
            children: errors.description
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: t("repaymentType") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-2 flex-wrap",
            "data-ocid": "udhar_new.repayment_type_selector",
            children: repaymentTabs.map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setRepaymentType(key),
                "data-ocid": `udhar_new.repayment_type.${key}`,
                className: `rounded-full px-4 py-1.5 text-sm font-medium transition-all border ${repaymentType === key ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-background text-muted-foreground border-input hover:border-primary hover:text-foreground"}`,
                children: label
              },
              key
            ))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: repaymentType === "fixedDaily" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 },
          transition: { duration: 0.25, ease: "easeInOut" },
          className: "overflow-hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-primary", children: t("fixedDaily") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "dailyAmount",
                    className: "text-sm font-medium text-foreground",
                    children: [
                      t("dailyAmount"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "dailyAmount",
                    type: "number",
                    min: "1",
                    value: dailyAmount,
                    onChange: (e) => {
                      setDailyAmount(e.target.value);
                      if (errors.dailyAmount)
                        setErrors((p) => ({
                          ...p,
                          dailyAmount: void 0
                        }));
                    },
                    placeholder: "100",
                    className: inputCls(errors.dailyAmount),
                    "data-ocid": "udhar_new.daily_amount_input"
                  }
                ),
                errors.dailyAmount && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.dailyAmount })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "totalDays",
                    className: "text-sm font-medium text-foreground",
                    children: [
                      t("totalDays"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "totalDays",
                    type: "number",
                    min: "1",
                    value: totalDays,
                    onChange: (e) => {
                      setTotalDays(e.target.value);
                      if (errors.totalDays)
                        setErrors((p) => ({
                          ...p,
                          totalDays: void 0
                        }));
                    },
                    placeholder: "100",
                    className: inputCls(errors.totalDays),
                    "data-ocid": "udhar_new.total_days_input"
                  }
                ),
                errors.totalDays && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.totalDays })
              ] })
            ] }),
            Number(dailyAmount) > 0 && Number(totalDays) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 6 },
                animate: { opacity: 1, y: 0 },
                className: "rounded-lg bg-card border border-primary/30 p-3 space-y-2",
                "data-ocid": "udhar_new.fixed_breakdown_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-primary", children: t("repaymentBreakdown") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("totalToCollect") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                      "₹",
                      fmt(fixedCalc.total)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("profitAmount") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `font-bold ${fixedCalc.profit >= 0 ? "text-emerald-500" : "text-destructive"}`,
                        children: [
                          "₹",
                          fmt(fixedCalc.profit)
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground pt-1 border-t border-border/50", children: [
                    "₹",
                    dailyAmount,
                    "/day × ",
                    totalDays,
                    " days = ₹",
                    fmt(fixedCalc.total)
                  ] })
                ]
              }
            )
          ] })
        },
        "fixed-daily"
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: repaymentType === "interestLoan" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 },
          transition: { duration: 0.25, ease: "easeInOut" },
          className: "overflow-hidden",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-blue-500", children: t("interestLoan") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "interestRate",
                    className: "text-sm font-medium text-foreground",
                    children: [
                      t("interestRate"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "interestRate",
                    type: "number",
                    min: "0.1",
                    step: "0.1",
                    value: interestRate,
                    onChange: (e) => {
                      setInterestRate(e.target.value);
                      if (errors.interestRate)
                        setErrors((p) => ({
                          ...p,
                          interestRate: void 0
                        }));
                    },
                    placeholder: "2",
                    className: inputCls(errors.interestRate),
                    "data-ocid": "udhar_new.interest_rate_input"
                  }
                ),
                errors.interestRate && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.interestRate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    htmlFor: "loanDuration",
                    className: "text-sm font-medium text-foreground",
                    children: [
                      t("loanDuration"),
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "loanDuration",
                    type: "number",
                    min: "1",
                    step: "1",
                    value: loanDuration,
                    onChange: (e) => {
                      setLoanDuration(e.target.value);
                      if (errors.loanDuration)
                        setErrors((p) => ({
                          ...p,
                          loanDuration: void 0
                        }));
                    },
                    placeholder: "6",
                    className: inputCls(errors.loanDuration),
                    "data-ocid": "udhar_new.loan_duration_input"
                  }
                ),
                errors.loanDuration && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.loanDuration })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "repaymentMode",
                  className: "text-sm font-medium text-foreground",
                  children: t("repaymentMode")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  id: "repaymentMode",
                  value: repaymentMode,
                  onChange: (e) => setRepaymentMode(e.target.value),
                  className: "flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors",
                  "data-ocid": "udhar_new.repayment_mode_select",
                  children: REPAYMENT_MODES.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.value, children: t(m.labelKey) }, m.value))
                }
              )
            ] }),
            Number(interestRate) > 0 && Number(loanDuration) > 0 && Number(amount) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 6 },
                animate: { opacity: 1, y: 0 },
                className: "rounded-lg bg-card border border-blue-500/30 p-3 space-y-2",
                "data-ocid": "udhar_new.loan_breakdown_card",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-blue-500", children: t("repaymentBreakdown") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("totalInterest") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-blue-500", children: [
                      "₹",
                      fmt(loanCalc.totalInt)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm border-t border-border/50 pt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("totalPayable") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-primary", children: [
                      "₹",
                      fmt(loanCalc.totalPay)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 border-t border-border/50 space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: t("repaymentSchedule") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-3 gap-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs col-span-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("dailyInstallment") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground ml-2", children: [
                          "₹",
                          fmt(loanCalc.daily)
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs col-span-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("monthlyInstallment") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground ml-2", children: [
                          "₹",
                          fmt(loanCalc.monthly)
                        ] })
                      ] }),
                      loanCalc.quarterly !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs col-span-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("quarterlyInstallment") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground ml-2", children: [
                          "₹",
                          fmt(loanCalc.quarterly)
                        ] })
                      ] }),
                      loanCalc.halfYearly !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs col-span-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: t("halfYearlyInstallment") }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground ml-2", children: [
                          "₹",
                          fmt(loanCalc.halfYearly)
                        ] })
                      ] })
                    ] })
                  ] })
                ]
              }
            )
          ] })
        },
        "interest-loan"
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "dueDate",
            className: "text-sm font-semibold text-foreground",
            children: [
              t("dueDate"),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-normal text-muted-foreground", children: t("optional") })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "dueDate",
            name: "dueDate",
            type: "date",
            value: dueDate,
            min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            onChange: (e) => setDueDate(e.target.value),
            className: inputCls(),
            "data-ocid": "udhar_new.due_date_input"
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
              t("notes"),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-normal text-muted-foreground", children: t("optional") })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            id: "notes",
            name: "notes",
            rows: 3,
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "Any additional remarks about this credit entry...",
            className: "flex w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors",
            "data-ocid": "udhar_new.notes_textarea"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "h-12 w-full text-base font-semibold",
          "data-ocid": "udhar_new.submit_button",
          disabled: createMutation.isPending,
          children: createMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" }),
            t("saving")
          ] }) : t("saveCreditEntry")
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: "Credit will be added to the customer's outstanding balance immediately." })
  ] }) });
}
export {
  UdharNewPage as default
};
