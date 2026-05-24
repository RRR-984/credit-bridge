const LOCALE_MAP: Record<string, string> = {
  INR: "en-IN",
  USD: "en-US",
  AED: "ar-AE",
  GBP: "en-GB",
};

export function formatCurrency(amount: number, currencyCode: string): string {
  const locale = LOCALE_MAP[currencyCode] ?? "en-US";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
}

export function formatDate(date: Date | string, dateFormat: string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return String(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear());

  switch (dateFormat) {
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    default:
      return `${day}/${month}/${year}`;
  }
}
