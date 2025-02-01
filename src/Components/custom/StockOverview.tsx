"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import axios from "axios";
import calculateFodderTotals from "../Functions/Calculatetransaction";
interface Transaction {
  id: string;
  date: Date;
  fodderType: string;
  sellQuantity: number;
  sellAmount: number;
  buyQuantity: number;
  buyAmount: number;
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

  const [transactionDatas, setTransactionDatas] = useState<Transaction>();
  const [calcData, setCalcData] = useState<any>();
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
      setCalcData(calculateData);
    }
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
            <div className="flex flex-col md:flex-row  w-full justify-center  gap-4">
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ ખરીદેલ</p>
                <p>
                  જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {" "}
                    {calcData?.bajari?.totalBuyQuantity +
                      (calcData?.makai?.totalBuyQuantity ? calcData?.makai?.totalBuyQuantity:0)}{" "}
                  </span>
                  kg
                </p>
                <p>
                  રકમ: ₹{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari?.totalBuyAmount +
                      (calcData?.makai?.totalBuyAmount ? calcData?.makai?.totalBuyAmount: 0)}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ વેચાણ</p>
                <p>
                  જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari?.totalSellQuantity +
                      (calcData?.makai?.totalSellQuantity ? calcData?.makai?.totalSellQuantity :0)}
                  </span>
                  kg
                </p>
                <p>
                  રકમ: ₹{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari?.totalSellAmount +
                      (calcData?.makai?.totalSellAmount ? calcData?.makai?.totalSellAmount:0)}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">બાકી જથ્થો</p>
                <p className="text-center">
                  <span className="font-bold text-xl">
                    {" "}
                    {calcData?.bajari?.totalBuyQuantity +
                      (calcData?.makai?.totalBuyQuantity ?calcData?.makai?.totalBuyQuantity : 0) 
                    -
                    calcData?.bajari?.totalSellAmount -
                      (calcData?.makai?.totalSellAmount ? calcData?.makai?.totalSellAmount: 0 )}
                  </span>
                  kg
                </p>
              </div>
            </div>
          </div>
          <div className="border-t p-2">
            <h3 className="font-semibold text-center">બાજરી</h3>
            <div className="flex flex-col md:flex-row  w-full justify-center  gap-4">
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ ખરીદેલ</p>
                <p>
                  જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari?.totalBuyQuantity}
                  </span>{" "}
                  kg
                </p>
                <p>
                  રકમ: ₹{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari?.totalBuyAmount}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ વેચાણ</p>
                <p>
                  જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari?.totalSellQuantity}
                  </span>{" "}
                  kg
                </p>
                <p>
                  Amount: ₹{" "}
                  <span className="font-bold text-xl">
                    {calcData?.bajari?.totalSellAmount}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t p-2 ">
            <h3 className="font-semibold text-center">મકાઈ</h3>
            <div className="flex flex-col md:flex-row  w-full justify-center  gap-4">
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ ખરીદેલ</p>
                <p>
                  જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {calcData?.makai?.totalBuyQuantity ?calcData?.makai?.totalBuyQuantity:0}{" "}
                  </span>
                  kg
                </p>
                <p>
                  રકમ: ₹
                  <span className="font-bold text-xl">
                    {calcData?.makai?.totalBuyAmount ? calcData?.makai?.totalBuyAmount:0}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ વેચાણ</p>
                <p>
                  જથ્થો:
                  <span className="font-bold text-xl">
                    {calcData?.makai?.totalSellQuantity? calcData?.makai?.totalSellQuantity:0}{" "}
                  </span>
                  kg
                </p>
                <p>
                  રકમ: ₹ ₹
                  <span className="font-bold text-xl">
                    {calcData?.makai?.totalSellAmount?calcData?.makai?.totalSellAmount:0}
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
