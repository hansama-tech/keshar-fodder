"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import axios from "axios";
import calculateFodderTotals from "../Functions/Calculatetransaction";
interface Transaction {
  id: string;
  date: string;
  fodderType: string;
  sellQuantity: string;
  sellAmount: string;
  buyQuantity: string;
  buyAmount: string;
}

export default function StockOverview() {
  const [stockOverview, setStockOverview] = useState({
    bajari: {
      currentStock: 0,
      stockValue: 0,
    },
    makai: {
      currentStock: 0,
      stockValue: 0,
    },
  });

  useEffect(() => {
    // Fetch stock overview data from API
    // For now, we'll use mock data
    setStockOverview({
      bajari: {
        currentStock: 3000,
        stockValue: 150000,
      },
      makai: {
        currentStock: 2000,
        stockValue: 100000,
      },
    });
  }, []);

  const totalStock =
    stockOverview.bajari.currentStock + stockOverview.makai.currentStock;
  const totalValue =
    stockOverview.bajari.stockValue + stockOverview.makai.stockValue;

  const [transactionDatas, setTransactionDatas] = useState<Transaction>();
  const [calcData, setCalcData] = useState<any>();
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

  useEffect(() => {
    if (transactionDatas) {
      const calculateData = calculateFodderTotals(transactionDatas);
      console.log(calculateData?.bajari);
      setCalcData(calculateData);
    }
    console.log(calcData?.bajari);
  }, [transactionDatas]);
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Stock Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-semibold">Total</h3>
            <div className="flex  gap-8">
              <div className="flex flex-col">
                <p>
                  Buy Stock:{" "}
                  {calcData?.bajari.totalBuyQuantity +
                    calcData?.makai.totalBuyQuantity}{" "}
                  kg
                </p>
                <p>
                  Buy Amount: ₹
                  {calcData?.bajari.totalBuyAmount +
                    calcData?.makai.totalBuyAmount}
                </p>
              </div>
              <div className="flex flex-col">
                <p>
                  Sell Stock:{" "}
                  {calcData?.bajari.totalSellQuantity +
                    calcData?.makai.totalSellQuantity}{" "}
                  kg
                </p>
                <p>
                  sell Amount: ₹
                  {calcData?.bajari.totalSellAmount +
                    calcData?.makai.totalSellAmount}
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Bajari</h3>
            <div className="flex  gap-8">
              <div className="flex flex-col">
                <p>Buy Stock: {calcData?.bajari.totalBuyQuantity} kg</p>
                <p>Buy Amount: ₹{calcData?.bajari.totalBuyAmount}</p>
              </div>
              <div className="flex flex-col">
                <p>Sell Stock: {calcData?.bajari.totalSellQuantity} kg</p>
                <p>sell Amount: ₹{calcData?.bajari.totalSellAmount}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Makai</h3>
            <div className="flex  gap-8">
              <div className="flex flex-col">
                <p>
                  Buy Stock:{" "}
                  {calcData?.makai.totalBuyQuantity}{" "}
                  kg
                </p>
                <p>
                  Buy Amount: ₹
                  {calcData?.makai.totalBuyAmount}
                </p>
              </div>
              <div className="flex flex-col">
                <p>
                  Sell Stock:{" "}
                  {calcData?.makai.totalSellQuantity}{" "}
                  kg
                </p>
                <p>
                  sell Amount: ₹
                  {calcData?.makai.totalSellAmount}
                </p>
              </div>
            </div>
          </div>
        </div>
       
      </CardContent>
    </Card>
  );
}
