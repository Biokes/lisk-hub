export function calculateFee(
  amount: bigint,
  feePercentage: number = 2
): { fee: bigint; net: bigint } {
  const fee = (amount * BigInt(feePercentage)) / 100n
  const net = amount - fee
  return { fee, net }
}

export function formatTokenAmount(amount: bigint, decimals: number = 18): string {
  const divisor = 10n ** BigInt(decimals)
  const whole = amount / divisor
  const fractional = amount % divisor
  return `${whole}.${fractional.toString().padStart(decimals, '0').slice(0, 6)}`
}
