import type { CustomerView } from "@/backend";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useCreateJama, useCustomers } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import { PaymentType } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Banknote,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  Smartphone,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

const PAYMENT_MODES: Array<{
  value: PaymentType;
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  activeClass: string;
  iconClass: string;
  ringClass: string;
}> = [
  {
    value: PaymentType.cash,
    label: "Cash",
    icon: Banknote,
    activeClass:
      "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    iconClass: "text-emerald-500",
    ringClass: "focus-visible:ring-emerald-500",
  },
  {
    value: PaymentType.online,
    label: "Online",
    sublabel: "UPI / NEFT",
    icon: Smartphone,
    activeClass:
      "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    iconClass: "text-blue-500",
    ringClass: "focus-visible:ring-blue-500",
  },
  {
    value: PaymentType.deposit,
    label: "Deposit",
    sublabel: "Bank",
    icon: Building2,
    activeClass:
      "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    iconClass: "text-orange-500",
    ringClass: "focus-visible:ring-orange-500",
  },
];

interface FormErrors {
  customerId?: string;
  amount?: string;
}

export default function JamaNewPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, string>;
  const preselectedId = search?.customerId ?? "";

  const { data: customers = [], isLoading: customersLoading } = useCustomers();
  const createMutation = useCreateJama();

  const [selectedCustomerId, setSelectedCustomerId] =
    useState<string>(preselectedId);
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState<PaymentType>(PaymentType.cash);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [customerSearch, setCustomerSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCustomer: CustomerView | undefined = customers.find(
    (c) => c.id.toString() === selectedCustomerId,
  );

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.mobileNumber.includes(customerSearch),
  );

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!selectedCustomerId) newErrors.customerId = "Please select a customer";
    if (!amount || Number(amount) < 1)
      newErrors.amount = "Enter a valid amount (min 1)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createMutation.mutateAsync({
        customerId: BigInt(selectedCustomerId),
        amount: BigInt(Math.round(Number(amount))),
        notes,
        paymentType: paymentMode,
      });
      navigate({
        to: "/customers/$customerId",
        params: { customerId: selectedCustomerId },
      });
    } catch {
      // error shown via mutation.isError
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

  function selectCustomer(c: CustomerView) {
    setSelectedCustomerId(c.id.toString());
    setCustomerSearch("");
    setDropdownOpen(false);
    if (errors.customerId)
      setErrors((prev) => ({ ...prev, customerId: undefined }));
  }

  return (
    <Layout title="Record Jama">
      <div className="mx-auto max-w-lg">
        {/* Back button */}
        <button
          type="button"
          onClick={handleBack}
          className="mb-5 flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          data-ocid="jama_new.back_link"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {/* Page header */}
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Record Jama (Payment)
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter payment received from customer
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Customer selector */}
          <div className="space-y-1.5">
            <label
              htmlFor="customer-search-input"
              className="text-sm font-semibold text-foreground"
            >
              Customer <span className="text-destructive">*</span>
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                id="customer-search-input"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((v) => !v)}
                className={cn(
                  "flex h-11 w-full items-center justify-between rounded-lg border bg-background px-3 py-2 text-sm transition-colors",
                  errors.customerId
                    ? "border-destructive ring-1 ring-destructive"
                    : "border-input hover:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
                data-ocid="jama_new.customer_select"
                disabled={customersLoading}
              >
                <span
                  className={
                    selectedCustomer
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {customersLoading
                    ? "Loading customers…"
                    : selectedCustomer
                      ? `${selectedCustomer.name} · ${selectedCustomer.mobileNumber}`
                      : "Select a customer"}
                </span>
                <ChevronDown
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
                  {/* Search input inside dropdown */}
                  <div className="border-b border-border p-2">
                    <input
                      type="text"
                      placeholder="Search by name or mobile…"
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="h-8 w-full rounded-md border border-input bg-background px-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      data-ocid="jama_new.customer_search_input"
                    />
                  </div>
                  <ul className="max-h-52 overflow-y-auto py-1">
                    {filteredCustomers.length === 0 ? (
                      <li className="px-3 py-2 text-sm text-muted-foreground">
                        No customers found
                      </li>
                    ) : (
                      filteredCustomers.map((c) => (
                        <li key={c.id.toString()}>
                          <button
                            type="button"
                            onClick={() => selectCustomer(c)}
                            className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                          >
                            <span>
                              <span className="font-medium text-foreground">
                                {c.name}
                              </span>
                              <span className="ml-2 text-muted-foreground">
                                {c.mobileNumber}
                              </span>
                            </span>
                            {c.id.toString() === selectedCustomerId && (
                              <Check
                                size={14}
                                className="shrink-0 text-primary"
                              />
                            )}
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
                data-ocid="jama_new.customer_field_error"
              >
                {errors.customerId}
              </p>
            )}
          </div>

          {/* Payment Amount */}
          <div className="space-y-1.5">
            <label
              htmlFor="amount"
              className="text-sm font-semibold text-foreground"
            >
              Payment Amount (₹) <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                ₹
              </span>
              <input
                id="amount"
                name="amount"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount)
                    setErrors((prev) => ({ ...prev, amount: undefined }));
                }}
                onBlur={() => {
                  if (!amount || Number(amount) < 1)
                    setErrors((prev) => ({
                      ...prev,
                      amount: "Enter a valid amount (min 1)",
                    }));
                }}
                placeholder="0"
                className={cn(
                  "flex h-11 w-full rounded-lg border bg-background py-2 pl-8 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
                  errors.amount
                    ? "border-destructive ring-1 ring-destructive focus-visible:ring-destructive"
                    : "border-input focus-visible:ring-ring",
                )}
                data-ocid="jama_new.amount_input"
              />
            </div>
            {errors.amount && (
              <p
                className="text-xs text-destructive"
                data-ocid="jama_new.amount_field_error"
              >
                {errors.amount}
              </p>
            )}
          </div>

          {/* Payment Mode — visually prominent colored tabs */}
          <div className="space-y-2">
            <p
              id="payment-mode-label"
              className="text-sm font-semibold text-foreground"
            >
              Payment Mode <span className="text-destructive">*</span>
            </p>
            <div
              role="radiogroup"
              aria-labelledby="payment-mode-label"
              className="grid grid-cols-3 gap-2.5"
              data-ocid="jama_new.payment_mode_group"
            >
              {PAYMENT_MODES.map((mode) => {
                const Icon = mode.icon;
                const isActive = paymentMode === mode.value;
                return (
                  <button
                    key={mode.value}
                    type="button"
                    onClick={() => setPaymentMode(mode.value)}
                    className={cn(
                      "relative flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2",
                      mode.ringClass,
                      isActive
                        ? mode.activeClass
                        : "border-border bg-card text-muted-foreground hover:border-border hover:bg-muted/50",
                    )}
                    data-ocid={`jama_new.payment_mode.${mode.value}`}
                  >
                    <Icon
                      size={22}
                      className={cn(
                        "transition-colors",
                        isActive ? mode.iconClass : "text-muted-foreground",
                      )}
                    />
                    <span className="leading-tight">{mode.label}</span>
                    {mode.sublabel && (
                      <span className="text-[10px] leading-none opacity-70">
                        {mode.sublabel}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute right-2 top-2">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label
              htmlFor="notes"
              className="text-sm font-semibold text-foreground"
            >
              Notes
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Partial payment, advance, etc."
              className="flex w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="jama_new.notes_input"
            />
          </div>

          {/* Mutation error */}
          {createMutation.isError && (
            <div
              className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              data-ocid="jama_new.error_state"
            >
              Failed to record payment. Please try again.
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
            data-ocid="jama_new.submit_button"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Saving…
              </span>
            ) : (
              "Record Payment"
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
