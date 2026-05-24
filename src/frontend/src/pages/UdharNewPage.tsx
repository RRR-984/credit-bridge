import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useCreateUdhar, useCustomers } from "@/hooks/useBackend";
import { translate } from "@/lib/i18n";
import type { RepaymentMode, RepaymentType } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Banknote, ChevronLeft, ChevronsUpDown, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

const REPAYMENT_MODES: {
  value: RepaymentMode;
  labelKey: Parameters<typeof translate>[1];
}[] = [
  { value: "endOfTerm", labelKey: "endOfTerm" },
  { value: "monthly", labelKey: "monthly" },
  { value: "quarterly", labelKey: "quarterly" },
  { value: "halfYearly", labelKey: "halfYearly" },
  { value: "daily", labelKey: "daily" },
];

interface FormErrors {
  customerId?: string;
  amount?: string;
  description?: string;
  dailyAmount?: string;
  totalDays?: string;
  interestRate?: string;
  loanDuration?: string;
}

export default function UdharNewPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, string>;
  const preselectedId = search?.customerId ?? "";
  const { language } = useAppContext();
  const t = (key: Parameters<typeof translate>[1]) => translate(language, key);

  const { data: customers = [], isLoading: customersLoading } = useCustomers();
  const createMutation = useCreateUdhar();

  // Base form state
  const [selectedCustomerId, setSelectedCustomerId] = useState(preselectedId);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  // Repayment type
  const [repaymentType, setRepaymentType] = useState<RepaymentType>("simple");

  // Fixed daily fields
  const [dailyAmount, setDailyAmount] = useState("");
  const [totalDays, setTotalDays] = useState("");

  // Interest loan fields
  const [interestRate, setInterestRate] = useState("");
  const [loanDuration, setLoanDuration] = useState("");
  const [repaymentMode, setRepaymentMode] =
    useState<RepaymentMode>("endOfTerm");

  // Customer search dropdown
  const [customerSearch, setCustomerSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCustomer = customers.find(
    (c) => c.id.toString() === selectedCustomerId,
  );

  useEffect(() => {
    if (preselectedId && customers.length > 0) {
      setSelectedCustomerId(preselectedId);
    }
  }, [preselectedId, customers]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
        setCustomerSearch("");
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.mobileNumber.includes(customerSearch),
  );

  // Live calculations — Fixed Daily
  const fixedCalc = useMemo(() => {
    const principal = Number(amount) || 0;
    const daily = Number(dailyAmount) || 0;
    const days = Number(totalDays) || 0;
    const total = daily * days;
    const profit = total - principal;
    return { total, profit };
  }, [amount, dailyAmount, totalDays]);

  // Live calculations — Interest Loan
  const loanCalc = useMemo(() => {
    const principal = Number(amount) || 0;
    const rate = Number(interestRate) || 0;
    const months = Number(loanDuration) || 0;
    const totalInt = (principal * rate * months) / 100;
    const totalPay = principal + totalInt;
    const daily = months > 0 ? totalPay / (months * 30) : 0;
    const monthly = months > 0 ? totalPay / months : 0;
    const quarterly = months >= 3 ? totalPay / (months / 3) : null;
    const halfYearly = months >= 6 ? totalPay / (months / 6) : null;
    return { totalInt, totalPay, daily, monthly, quarterly, halfYearly };
  }, [amount, interestRate, loanDuration]);

  function validate(): boolean {
    const errs: FormErrors = {};
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    const dueTimestamp = dueDate
      ? BigInt(new Date(dueDate).getTime()) * 1_000_000n
      : undefined;

    const baseArgs = {
      customerId: BigInt(selectedCustomerId),
      amount: BigInt(Math.round(Number(amount))),
      description: description.trim(),
      notes: notes.trim(),
      dueDate: dueTimestamp,
      repaymentType,
    };

    const extraArgs =
      repaymentType === "fixedDaily"
        ? {
            dailyAmount: Number(dailyAmount),
            totalDays: BigInt(Math.round(Number(totalDays))),
          }
        : repaymentType === "interestLoan"
          ? {
              interestRate: Number(interestRate),
              loanDurationMonths: BigInt(Math.round(Number(loanDuration))),
              repaymentMode,
            }
          : {};

    try {
      const result = await createMutation.mutateAsync({
        ...baseArgs,
        ...extraArgs,
      });
      toast.success("Credit entry saved successfully!");
      navigate({
        to: "/customers/$customerId",
        params: { customerId: result.customerId.toString() },
      });
    } catch {
      toast.error("Failed to save credit entry. Please try again.");
    }
  }

  function handleBack() {
    if (preselectedId) {
      navigate({
        to: "/customers/$customerId",
        params: { customerId: preselectedId },
      });
    } else {
      navigate({ to: "/dashboard" });
    }
  }

  const inputCls = (hasErr?: string) =>
    `flex h-11 w-full rounded-lg border ${
      hasErr ? "border-destructive" : "border-input"
    } bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors`;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n);

  const repaymentTabs: { key: RepaymentType; label: string }[] = [
    { key: "simple", label: t("simple") },
    { key: "fixedDaily", label: t("fixedDaily") },
    { key: "interestLoan", label: t("interestLoan") },
  ];

  return (
    <Layout title={t("addCredit")}>
      <div className="mx-auto max-w-lg px-1 pb-10">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Go back"
            data-ocid="udhar_new.back_button"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              {t("addCredit")}
            </h1>
            <p className="text-xs text-muted-foreground">
              Record credit given to customer
            </p>
          </div>
        </div>

        <div className="glass-card rounded-xl border border-border/60 p-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Customer selector */}
            <div className="space-y-1.5">
              <label
                htmlFor="customerId"
                className="text-sm font-semibold text-foreground"
              >
                {t("customer")} <span className="text-destructive">*</span>
              </label>
              <div className="relative" ref={dropdownRef}>
                <button
                  id="customerId"
                  type="button"
                  onClick={() => {
                    setDropdownOpen((o) => !o);
                    setCustomerSearch("");
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  className={`flex h-11 w-full items-center justify-between rounded-lg border ${
                    errors.customerId ? "border-destructive" : "border-input"
                  } bg-background px-3 py-2 text-sm transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                  data-ocid="udhar_new.customer_select"
                >
                  <span
                    className={
                      selectedCustomer
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }
                  >
                    {customersLoading
                      ? "Loading customers..."
                      : selectedCustomer
                        ? `${selectedCustomer.name} · ${selectedCustomer.mobileNumber}`
                        : t("searchCustomer")}
                    ,
                  </span>
                  <ChevronsUpDown
                    size={15}
                    className="shrink-0 text-muted-foreground"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg">
                    <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                      <Search
                        size={14}
                        className="shrink-0 text-muted-foreground"
                      />
                      <input
                        type="text"
                        placeholder="Search by name or mobile..."
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                        data-ocid="udhar_new.customer_search_input"
                      />
                    </div>
                    <ul className="max-h-52 overflow-y-auto py-1">
                      {filteredCustomers.length === 0 ? (
                        <li className="px-3 py-3 text-center text-sm text-muted-foreground">
                          {t("noCustomers")}
                        </li>
                      ) : (
                        filteredCustomers.map((c) => (
                          <li key={c.id.toString()}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCustomerId(c.id.toString());
                                setDropdownOpen(false);
                                setCustomerSearch("");
                                if (errors.customerId)
                                  setErrors((p) => ({
                                    ...p,
                                    customerId: undefined,
                                  }));
                              }}
                              className={`flex w-full cursor-pointer items-center justify-between px-3 py-2.5 text-sm transition-colors hover:bg-muted ${
                                c.id.toString() === selectedCustomerId
                                  ? "bg-primary/10 font-medium text-primary"
                                  : "text-foreground"
                              }`}
                            >
                              <span>{c.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {c.mobileNumber}
                              </span>
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {errors.customerId && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="udhar_new.customer_select.field_error"
                >
                  {errors.customerId}
                </p>
              )}
            </div>

            {/* Credit Amount */}
            <div className="space-y-1.5">
              <label
                htmlFor="amount"
                className="text-sm font-semibold text-foreground"
              >
                {t("creditAmount")} <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Banknote
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="1"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (errors.amount)
                      setErrors((p) => ({ ...p, amount: undefined }));
                  }}
                  placeholder="0"
                  className={`${inputCls(errors.amount)} pl-8`}
                  data-ocid="udhar_new.amount_input"
                />
              </div>
              {errors.amount && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="udhar_new.amount_input.field_error"
                >
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Product / Service */}
            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-foreground"
              >
                {t("productService")}{" "}
                <span className="text-destructive">*</span>
              </label>
              <input
                id="description"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((p) => ({ ...p, description: undefined }));
                }}
                placeholder="e.g. Rice 5kg, Flour, Monthly groceries"
                className={inputCls(errors.description)}
                data-ocid="udhar_new.description_input"
              />
              {errors.description && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="udhar_new.description_input.field_error"
                >
                  {errors.description}
                </p>
              )}
            </div>

            {/* ── Repayment Type Selector ── */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-foreground">
                {t("repaymentType")}
              </p>
              <div
                className="flex gap-2 flex-wrap"
                data-ocid="udhar_new.repayment_type_selector"
              >
                {repaymentTabs.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRepaymentType(key)}
                    data-ocid={`udhar_new.repayment_type.${key}`}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all border ${
                      repaymentType === key
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background text-muted-foreground border-input hover:border-primary hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Fixed Daily Section ── */}
            <AnimatePresence>
              {repaymentType === "fixedDaily" && (
                <motion.div
                  key="fixed-daily"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {t("fixedDaily")}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="dailyAmount"
                          className="text-sm font-medium text-foreground"
                        >
                          {t("dailyAmount")}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="dailyAmount"
                          type="number"
                          min="1"
                          value={dailyAmount}
                          onChange={(e) => {
                            setDailyAmount(e.target.value);
                            if (errors.dailyAmount)
                              setErrors((p) => ({
                                ...p,
                                dailyAmount: undefined,
                              }));
                          }}
                          placeholder="100"
                          className={inputCls(errors.dailyAmount)}
                          data-ocid="udhar_new.daily_amount_input"
                        />
                        {errors.dailyAmount && (
                          <p className="text-xs text-destructive">
                            {errors.dailyAmount}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="totalDays"
                          className="text-sm font-medium text-foreground"
                        >
                          {t("totalDays")}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="totalDays"
                          type="number"
                          min="1"
                          value={totalDays}
                          onChange={(e) => {
                            setTotalDays(e.target.value);
                            if (errors.totalDays)
                              setErrors((p) => ({
                                ...p,
                                totalDays: undefined,
                              }));
                          }}
                          placeholder="100"
                          className={inputCls(errors.totalDays)}
                          data-ocid="udhar_new.total_days_input"
                        />
                        {errors.totalDays && (
                          <p className="text-xs text-destructive">
                            {errors.totalDays}
                          </p>
                        )}
                      </div>
                    </div>

                    {Number(dailyAmount) > 0 && Number(totalDays) > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-card border border-primary/30 p-3 space-y-2"
                        data-ocid="udhar_new.fixed_breakdown_card"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-primary">
                          {t("repaymentBreakdown")}
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {t("totalToCollect")}
                          </span>
                          <span className="font-bold text-primary">
                            ₹{fmt(fixedCalc.total)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {t("profitAmount")}
                          </span>
                          <span
                            className={`font-bold ${fixedCalc.profit >= 0 ? "text-emerald-500" : "text-destructive"}`}
                          >
                            ₹{fmt(fixedCalc.profit)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground pt-1 border-t border-border/50">
                          ₹{dailyAmount}/day × {totalDays} days = ₹
                          {fmt(fixedCalc.total)}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Interest Loan Section ── */}
            <AnimatePresence>
              {repaymentType === "interestLoan" && (
                <motion.div
                  key="interest-loan"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                      {t("interestLoan")}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="interestRate"
                          className="text-sm font-medium text-foreground"
                        >
                          {t("interestRate")}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="interestRate"
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => {
                            setInterestRate(e.target.value);
                            if (errors.interestRate)
                              setErrors((p) => ({
                                ...p,
                                interestRate: undefined,
                              }));
                          }}
                          placeholder="2"
                          className={inputCls(errors.interestRate)}
                          data-ocid="udhar_new.interest_rate_input"
                        />
                        {errors.interestRate && (
                          <p className="text-xs text-destructive">
                            {errors.interestRate}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="loanDuration"
                          className="text-sm font-medium text-foreground"
                        >
                          {t("loanDuration")}{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <input
                          id="loanDuration"
                          type="number"
                          min="1"
                          step="1"
                          value={loanDuration}
                          onChange={(e) => {
                            setLoanDuration(e.target.value);
                            if (errors.loanDuration)
                              setErrors((p) => ({
                                ...p,
                                loanDuration: undefined,
                              }));
                          }}
                          placeholder="6"
                          className={inputCls(errors.loanDuration)}
                          data-ocid="udhar_new.loan_duration_input"
                        />
                        {errors.loanDuration && (
                          <p className="text-xs text-destructive">
                            {errors.loanDuration}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Repayment Mode */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="repaymentMode"
                        className="text-sm font-medium text-foreground"
                      >
                        {t("repaymentMode")}
                      </label>
                      <select
                        id="repaymentMode"
                        value={repaymentMode}
                        onChange={(e) =>
                          setRepaymentMode(e.target.value as RepaymentMode)
                        }
                        className="flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                        data-ocid="udhar_new.repayment_mode_select"
                      >
                        {REPAYMENT_MODES.map((m) => (
                          <option key={m.value} value={m.value}>
                            {t(m.labelKey)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Interest Loan Breakdown Card */}
                    {Number(interestRate) > 0 &&
                      Number(loanDuration) > 0 &&
                      Number(amount) > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-lg bg-card border border-blue-500/30 p-3 space-y-2"
                          data-ocid="udhar_new.loan_breakdown_card"
                        >
                          <p className="text-xs font-bold uppercase tracking-wider text-blue-500">
                            {t("repaymentBreakdown")}
                          </p>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {t("totalInterest")}
                            </span>
                            <span className="font-bold text-blue-500">
                              ₹{fmt(loanCalc.totalInt)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm border-t border-border/50 pt-2">
                            <span className="text-muted-foreground">
                              {t("totalPayable")}
                            </span>
                            <span className="font-bold text-primary">
                              ₹{fmt(loanCalc.totalPay)}
                            </span>
                          </div>
                          <div className="pt-1 border-t border-border/50 space-y-1.5">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              {t("repaymentSchedule")}
                            </p>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                              <div className="flex justify-between text-xs col-span-1">
                                <span className="text-muted-foreground">
                                  {t("dailyInstallment")}
                                </span>
                                <span className="font-semibold text-foreground ml-2">
                                  ₹{fmt(loanCalc.daily)}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs col-span-1">
                                <span className="text-muted-foreground">
                                  {t("monthlyInstallment")}
                                </span>
                                <span className="font-semibold text-foreground ml-2">
                                  ₹{fmt(loanCalc.monthly)}
                                </span>
                              </div>
                              {loanCalc.quarterly !== null && (
                                <div className="flex justify-between text-xs col-span-1">
                                  <span className="text-muted-foreground">
                                    {t("quarterlyInstallment")}
                                  </span>
                                  <span className="font-semibold text-foreground ml-2">
                                    ₹{fmt(loanCalc.quarterly)}
                                  </span>
                                </div>
                              )}
                              {loanCalc.halfYearly !== null && (
                                <div className="flex justify-between text-xs col-span-1">
                                  <span className="text-muted-foreground">
                                    {t("halfYearlyInstallment")}
                                  </span>
                                  <span className="font-semibold text-foreground ml-2">
                                    ₹{fmt(loanCalc.halfYearly)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Due Date */}
            <div className="space-y-1.5">
              <label
                htmlFor="dueDate"
                className="text-sm font-semibold text-foreground"
              >
                {t("dueDate")}
                <span className="ml-1 font-normal text-muted-foreground">
                  {t("optional")}
                </span>
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={dueDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDueDate(e.target.value)}
                className={inputCls()}
                data-ocid="udhar_new.due_date_input"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label
                htmlFor="notes"
                className="text-sm font-semibold text-foreground"
              >
                {t("notes")}
                <span className="ml-1 font-normal text-muted-foreground">
                  {t("optional")}
                </span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional remarks about this credit entry..."
                className="flex w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                data-ocid="udhar_new.notes_textarea"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                className="h-12 w-full text-base font-semibold"
                data-ocid="udhar_new.submit_button"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    {t("saving")}
                  </span>
                ) : (
                  t("saveCreditEntry")
                )}
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Credit will be added to the customer's outstanding balance
          immediately.
        </p>
      </div>
    </Layout>
  );
}
