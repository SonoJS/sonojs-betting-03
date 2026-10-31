// Shared currency / number formatting — docs/03 §22. Components never format numbers themselves.

const amountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** 1234.5 → "1,234.50 USDT" */
export function formatAmount(value: number, currency = 'USDT'): string {
  return `${amountFormatter.format(value)} ${currency}`
}

/** 1234.5 → "1,234.50" (no currency suffix) */
export function formatNumber(value: number): string {
  return amountFormatter.format(value)
}

/** 2480 → "+2,480.00 USDT" */
export function formatPayout(value: number, currency = 'USDT'): string {
  const sign = value > 0 ? '+' : ''
  return `${sign}${formatAmount(value, currency)}`
}

/** 12.4 → "12.4x" */
export function formatMultiplier(value: number): string {
  return `${value.toFixed(1)}x`
}
