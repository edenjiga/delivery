/**
 * format number to cop
 * @param {number} value
 */
export function formatNumberToCop(value: number): string | number {
  if (isNaN(value)) return value;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
  }).format(value);
}
