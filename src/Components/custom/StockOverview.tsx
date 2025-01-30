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
        <CardTitle>સ્ટોક ડેશબોર્ડ</CardTitle>
      </CardHeader>
      <CardContent className="p-0 shadow-md">
        <div className="flex flex-col gap-4">
          <div className=" p-2">
            <h3 className="font-semibold text-center">Total</h3>
            <div className="flex md:flex-row flex-wrap w-full justify-center  gap-4">
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ ખરીદેલ</p>
                <p>
                જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {" "}
                    {calcData?.bajari.totalBuyQuantity +
                      calcData?.makai.totalBuyQuantity}{" "}
                  </span>
                  kg
                </p>
                <p>
                રકમ: ₹{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari.totalBuyAmount +
                      calcData?.makai.totalBuyAmount}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ વેચાણ</p>
                <p>
                જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari.totalSellQuantity +
                      calcData?.makai.totalSellQuantity}{" "}
                  </span>
                  kg
                </p>
                <p>
                રકમ: ₹{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari.totalSellAmount +
                      calcData?.makai.totalSellAmount}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t p-2">
            <h3 className="font-semibold text-center">બાજરી</h3>
            <div className="flex md:flex-row flex-wrap w-full justify-center  gap-4">
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ ખરીદેલ</p>
                <p>
                જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari.totalBuyQuantity}
                  </span>
                  {" "}kg
                </p>
                <p>
                રકમ: ₹{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari.totalBuyAmount}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ વેચાણ</p>
                <p>
                જથ્થો: <span className="font-bold text-xl">{calcData?.bajari.totalSellQuantity}</span>
                  {" "}  kg
                </p>
                <p>
                 Amount: ₹ <span className="font-bold text-xl">{calcData?.bajari.totalSellAmount}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t p-2 ">
            <h3 className="font-semibold text-center">મકાઈ</h3>
            <div className="flex md:flex-row flex-wrap w-full justify-center  gap-4">
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ ખરીદેલ</p>
                <p>
                જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {calcData?.makai.totalBuyQuantity}{" "}
                  </span>
                  kg
                </p>
                <p>
                રકમ: ₹
                  <span className="font-bold text-xl">
                    {calcData?.makai.totalBuyAmount}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ વેચાણ</p>
                <p>
                જથ્થો:
                  <span className="font-bold text-xl">
                    {calcData?.makai.totalSellQuantity}{" "}
                  </span>
                  kg
                </p>
                <p>
                રકમ: ₹ ₹
                  <span className="font-bold text-xl">
                    {calcData?.makai.totalSellAmount}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
