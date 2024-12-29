export function formatCurrency(
  value: number,
  currency?: string | null,
  options?: Intl.NumberFormatOptions
) {
  if (typeof value !== "number") {
    value = 0;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    currencyDisplay: "narrowSymbol",
    ...options,
  }).format(value);
}
