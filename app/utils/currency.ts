export function formatCurrency(value: number, currency: string) {
  if (typeof value !== "number") {
    value = 0;
  }

  if (typeof currency !== "string") {
    throw new Error("Currency must be a string");
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(value);
}
