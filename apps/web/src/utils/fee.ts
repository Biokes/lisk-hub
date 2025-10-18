// Fee calculation utility
export function calculateFee(amount: string, feeRate: string): string {
  const amountNum = parseFloat(amount);
  const feeRateNum = parseFloat(feeRate);
  
  if (isNaN(amountNum) || isNaN(feeRateNum)) {
    return "0";
  }
  
  const fee = amountNum * feeRateNum;
  return fee.toFixed(6);
}
