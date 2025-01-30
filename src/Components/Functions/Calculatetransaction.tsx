interface Transaction {
  id: string;
  date: string;
  fodderType: string;
  sellQuantity: string;
  sellAmount: string;
  buyQuantity: string;
  buyAmount: string;
}

export default function calculateFodderTotals(data: Transaction) {
  if (Array.isArray(data)) {
    const result: Record<string, any> = {};

    const calcuData = data?.forEach((entry: any) => {
      const { fodderType, buyQuantity, buyAmount, sellQuantity, sellAmount } =
        entry;

      if (!result[fodderType]) {
        result[fodderType] = {
          totalBuyQuantity: 0,
          totalBuyAmount: 0,
          totalSellQuantity: 0,
          totalSellAmount: 0,
          netEarnings: 0,
        };
      }

      // Convert values to numbers
      const buyQty = Number(buyQuantity) || 0;
      const buyAmt = Number(buyAmount) || 0;
      const sellQty = Number(sellQuantity) || 0;
      const sellAmt = Number(sellAmount) || 0;

      // Update totals
      result[fodderType].totalBuyQuantity += buyQty;
      result[fodderType].totalBuyAmount += buyAmt;
      result[fodderType].totalSellQuantity += sellQty;
      result[fodderType].totalSellAmount += sellAmt;

      // Calculate net earnings (Total Sell Amount - Total Buy Amount)
      result[fodderType].netEarnings =
        result[fodderType].totalSellAmount - result[fodderType].totalBuyAmount;
    });
    return result;
  }
}
