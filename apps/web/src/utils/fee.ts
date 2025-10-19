// Fee calculation utility - hardcoded for frontend
export function calculateFee(
  amount: bigint,
  feePercentage: number = 2
): { fee: bigint; net: bigint } {
  const fee = (amount * BigInt(feePercentage)) / BigInt(100)
  const net = amount - fee
  return { fee, net }
}

export function formatTokenAmount(amount: bigint, decimals: number = 18): string {
  const divisor = BigInt(Math.pow(10, decimals))
  const whole = amount / divisor
  const fractional = amount % divisor
  return `${whole}.${fractional.toString().padStart(decimals, '0').slice(0, 6)}`
}
