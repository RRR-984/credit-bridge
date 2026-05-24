export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
  currency: CurrencyConfig;
  timezone: string;
  dateFormat: string;
}

export const COUNTRIES: CountryConfig[] = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    dialCode: "+91",
    currency: { code: "INR", symbol: "₹", locale: "en-IN" },
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
  },
  {
    code: "US",
    name: "USA",
    flag: "🇺🇸",
    dialCode: "+1",
    currency: { code: "USD", symbol: "$", locale: "en-US" },
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
  },
  {
    code: "AE",
    name: "UAE",
    flag: "🇦🇪",
    dialCode: "+971",
    currency: { code: "AED", symbol: "د.إ", locale: "ar-AE" },
    timezone: "Asia/Dubai",
    dateFormat: "DD/MM/YYYY",
  },
  {
    code: "GB",
    name: "UK",
    flag: "🇬🇧",
    dialCode: "+44",
    currency: { code: "GBP", symbol: "£", locale: "en-GB" },
    timezone: "Europe/London",
    dateFormat: "DD/MM/YYYY",
  },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];

export function getCountryByCode(code: string): CountryConfig {
  return COUNTRIES.find((c) => c.code === code) ?? DEFAULT_COUNTRY;
}
