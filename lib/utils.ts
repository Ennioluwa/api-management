import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",

  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",

  hour12: true,
});

interface Currency {
  code: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "NGN", symbol: "₦" },
  { code: "CAD", symbol: "CA$" },
  { code: "AUD", symbol: "A$" },
  { code: "JPY", symbol: "¥" },
  { code: "CHF", symbol: "Fr." },
  { code: "SEK", symbol: "kr" },
  { code: "CNY", symbol: "¥" },
  { code: "INR", symbol: "₹" },
  { code: "MXN", symbol: "MX$" },
  { code: "BRL", symbol: "R$" },
  { code: "TWD", symbol: "NT$" },
  { code: "KRW", symbol: "₩" },
];

export function getCurrencySymbol(code: string) {
  const currency = currencies.find((c) => c.code === code);

  if (!currency) {
    throw new Error("Invalid currency code");
  }

  return currency.symbol;
}
