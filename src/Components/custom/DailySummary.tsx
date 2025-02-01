"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import axios from "axios";
import calculateFodderTotals from "../Functions/Calculatetransaction";
interface Transaction {
  id: string;
  date: Date;
  fodderType: number;
  sellQuantity: number;
  sellAmount: number;
  buyQuantity: number;
  buyAmount: number;
}

export default function DailySummary() {
  const [transactionDatas, setTransactionDatas] = useState<Transaction>();
  // const [dailySummary, setDailySummary] = useState({
  //   bajari: {
  //     sell: { quantity: 0, amount: 0 },
  //     buy: { quantity: 0, amount: 0 },
  //   },
  //   makai: {
  //     sell: { quantity: 0, amount: 0 },
  //     buy: { quantity: 0, amount: 0 },
  //   },
  // });

  const getTransactionData = async () => {
    try {
      const Data = await axios.get("/api/dailyTransaction");
      setTransactionDatas(Data.data.data);
    } catch (err) {
      console.log("something wrong", err);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  // useEffect(() => {
  //   // Fetch daily summary data from API
  //   // For now, we'll use mock data
  //   setDailySummary({
  //     bajari: {
  //       sell: { quantity: 500, amount: 30000 },
  //       buy: { quantity: 1000, amount: 50000 },
  //     },
  //     makai: {
  //       sell: { quantity: 300, amount: 18000 },
  //       buy: { quantity: 800, amount: 40000 },
  //     },
  //   });
  // }, []);

  // const totalSellQuantity =
  //   dailySummary.bajari.sell.quantity + dailySummary.makai.sell.quantity;
  // const totalSellAmount =
  //   dailySummary.bajari.sell.amount + dailySummary.makai.sell.amount;
  // const totalBuyQuantity =
  //   dailySummary.bajari.buy.quantity + dailySummary.makai.buy.quantity;
  // const totalBuyAmount =
  //   dailySummary.bajari.buy.amount + dailySummary.makai.buy.amount;
  // const netEarnings = totalSellAmount - totalBuyAmount;
 
  // if(transactionDatas){

  //   console.log(calculateFodderTotals(transactionDatas));
  // }


  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Daily Summary</CardTitle>
      </CardHeader>
      {/* <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>

          </div>
          <div>
            <h3 className="font-semibold">Bajari</h3>
            <p>
              Sell: {dailySummary.bajari.sell.quantity} kg (₹
              {dailySummary.bajari.sell.amount})
            </p>
            <p>
              Buy: {dailySummary.bajari.buy.quantity} kg (₹
              {dailySummary.bajari.buy.amount})
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Makai</h3>
            <p>
              Sell: {dailySummary.makai.sell.quantity} kg (₹
              {dailySummary.makai.sell.amount})
            </p>
            <p>
              Buy: {dailySummary.makai.buy.quantity} kg (₹
              {dailySummary.makai.buy.amount})
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Total</h3>
          <p>
            Sell: {totalSellQuantity} kg (₹{totalSellAmount})
          </p>
          <p>
            Buy: {totalBuyQuantity} kg (₹{totalBuyAmount})
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Net Earnings</h3>
          <p className={netEarnings >= 0 ? "text-green-600" : "text-red-600"}>
            ₹{netEarnings}
          </p>
        </div>
      </CardContent> */}
    </Card>
  );
}

// export function calculateFodderTotals(data:any) {
//   const result = {};

//   data.data.forEach((entry:any) => {
//     const { fodderType, buyQuantity, buyAmount, sellQuantity, sellAmount } = entry;

//     if (!result[fodderType]) {
//       result[fodderType] = {
//         totalBuyQuantity: 0,
//         totalBuyAmount: 0,
//         totalSellQuantity: 0,
//         totalSellAmount: 0,
//         netEarnings: 0
//       };
//     }

//     // Convert values to numbers
//     const buyQty = Number(buyQuantity) || 0;
//     const buyAmt = Number(buyAmount) || 0;
//     const sellQty = Number(sellQuantity) || 0;
//     const sellAmt = Number(sellAmount) || 0;

//     // Update totals
//     result[fodderType].totalBuyQuantity += buyQty;
//     result[fodderType].totalBuyAmount += buyAmt;
//     result[fodderType].totalSellQuantity += sellQty;
//     result[fodderType].totalSellAmount += sellAmt;

//     // Calculate net earnings (Total Sell Amount - Total Buy Amount)
//     result[fodderType].netEarnings = result[fodderType].totalSellAmount - result[fodderType].totalBuyAmount;
//   });

//   return result;
// }

// // Example usage:
// const jsonData = {
//   "SUCCESS": true,
//   "data": [
//     {
//       "id": "679a63d982ed8bcd3db1f6e0",
//       "date": "2025-01-29T17:22:24.817Z",
//       "fodderType": "bajari",
//       "sellQuantity": "3434",
//       "sellAmount": "4343",
//       "buyQuantity": "4343",
//       "buyAmount": "43434"
//     },
//     {
//       "id": "679b1e1d521ca11e3bac186b",
//       "date": "2025-01-30T06:36:20.200Z",
//       "fodderType": "makai",
//       "sellQuantity": "3434",
//       "sellAmount": "43535",
//       "buyQuantity": "535",
//       "buyAmount": "527"
//     }
//   ]
// };

// console.log(calculateFodderTotals(jsonData));


// export function calculateFodderTotals(data:Transaction) {
//   if (Array.isArray(data)) {
//     const result: Record<string, any> = {};

//     const calcuData = data?.forEach((entry: any) => {
//       const { fodderType, buyQuantity, buyAmount, sellQuantity, sellAmount } =
//         entry;

//       if (!result[fodderType]) {
//         result[fodderType] = {
//           totalBuyQuantity: 0,
//           totalBuyAmount: 0,
//           totalSellQuantity: 0,
//           totalSellAmount: 0,
//           netEarnings: 0,
//         };
//       }

//       // Convert values to numbers
//       const buyQty = Number(buyQuantity) || 0;
//       const buyAmt = Number(buyAmount) || 0;
//       const sellQty = Number(sellQuantity) || 0;
//       const sellAmt = Number(sellAmount) || 0;

//       // Update totals
//       result[fodderType].totalBuyQuantity += buyQty;
//       result[fodderType].totalBuyAmount += buyAmt;
//       result[fodderType].totalSellQuantity += sellQty;
//       result[fodderType].totalSellAmount += sellAmt;

//       // Calculate net earnings (Total Sell Amount - Total Buy Amount)
//       result[fodderType].netEarnings =
//         result[fodderType].totalSellAmount - result[fodderType].totalBuyAmount;
//       });
//       return result;
//   }}
  