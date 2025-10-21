// utils/formatCurrency.ts

/**
 * Format number into Indian currency format (₹ 26,99,552)
 * @param amount number or string
 * @param showDecimals whether to show .00 (default false)
 */
export function formatCurrency(amount: number | string, showDecimals = false): string {
  const num = Number(amount) || 0;

  if (showDecimals) {
    return num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }

  return "₹ " + num.toLocaleString("en-IN");



}


export function formatNumber(value: number | string, unit?: string): string {
  const num = Number(value) || 0;
  const formatted = num.toLocaleString("en-IN"); // Indian number format

  return unit ? `${formatted} ${unit}` : formatted;
}
