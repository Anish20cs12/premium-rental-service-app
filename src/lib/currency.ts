export const INR_EXCHANGE_RATE = 83; // Approximate USD→INR conversion; adjust if needed

export function toINR(amountInUsd: number): number {
  if (!Number.isFinite(amountInUsd)) return 0;
  return Math.round(amountInUsd * INR_EXCHANGE_RATE);
}

export function formatINR(amountInInr: number): string {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(Math.max(0, Math.round(amountInInr)));
  } catch (_) {
    // Fallback if Intl is unavailable
    const v = Math.max(0, Math.round(amountInInr));
    return `₹${v.toLocaleString('en-IN')}`;
  }
}

export function formatUsdToInr(usd: number): string {
  return formatINR(toINR(usd));
}

