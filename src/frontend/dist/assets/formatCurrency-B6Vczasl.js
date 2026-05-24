const LOCALE_MAP = {
  INR: "en-IN",
  USD: "en-US",
  AED: "ar-AE",
  GBP: "en-GB"
};
function formatCurrency(amount, currencyCode) {
  const locale = LOCALE_MAP[currencyCode] ?? "en-US";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toFixed(2)}`;
  }
}
function formatDate(date, dateFormat) {
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
export {
  formatDate as a,
  formatCurrency as f
};
