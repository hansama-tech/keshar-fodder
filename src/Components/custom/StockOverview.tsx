"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import axios from "axios";
import calculateFodderTotals from "../Functions/Calculatetransaction";
import { formatCurrency, formatNumber } from "@/utils/formatCurrency";
interface Transaction {
  id: string;
  date: Date;
  fodderType: string;
  sellQuantity: number;
  sellAmount: number;
  buyQuantity: number;
  buyAmount: number;
}

export default function StockOverview(props: any) {
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
  const [days, setDays] = useState(props.days || "diwali_pachhi");
  const [calcData, setCalcData] = useState<any>();
  const getTransactionData = async () => {
    try {
      const Data = await axios.get(
        `/api/dailyTransaction?period=${props.days || days}`
      );
      setTransactionDatas(Data.data.data);
    } catch (err) {
      console.log("something wrong", err);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  useEffect(() => {
    getTransactionData();
  }, [props.days]);

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
                    {formatNumber(
                      calcData?.bajari?.totalBuyQuantity +
                        (calcData?.makai?.totalBuyQuantity
                          ? calcData?.makai?.totalBuyQuantity
                          : 0,
                        "kg")
                    )}
                  </span>
                </p>
                <p>
                  રકમ:
                  <span className="font-bold text-xl">
                    {formatCurrency(
                      calcData?.makai?.totalBuyAmount
                        ? calcData?.makai?.totalBuyAmount
                        : 0
                    )}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ વેચાણ</p>
                <p>
                  જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {formatNumber(
                      calcData?.bajari?.totalSellQuantity +
                        (calcData?.makai?.totalSellQuantity
                          ? calcData?.makai?.totalSellQuantity
                          : 0),
                      "kg"
                    )}
                  </span>
                </p>
                <p>
                  રકમ:
                  <span className="font-bold text-xl">
                    {formatCurrency(
                      calcData?.bajari?.totalSellAmount +
                        (calcData?.makai?.totalSellAmount
                          ? calcData?.makai?.totalSellAmount
                          : 0)
                    )}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">બાકી જથ્થો</p>
                <p className="text-center">
                  <span className="font-bold text-xl">
                    {" "}
                    {formatNumber(
                      calcData?.bajari?.totalBuyQuantity +
                        (calcData?.makai?.totalBuyQuantity
                          ? calcData?.makai?.totalBuyQuantity
                          : 0) -
                        calcData?.bajari?.totalSellQuantity -
                        (calcData?.makai?.totalSellQuantity
                          ? calcData?.makai?.totalSellQuantity
                          : 0),
                      "kg"
                    )}
                  </span>
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
                    {formatNumber(calcData?.bajari?.totalBuyQuantity, "kg")}
                  </span>
                </p>
                <p>
                  રકમ:
                  <span className="font-bold text-xl">
                    {formatCurrency(calcData?.bajari?.totalBuyAmount)}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ વેચાણ</p>
                <p>
                  જથ્થો:{" "}
                  <span className="font-bold text-xl">
                    {formatNumber(calcData?.bajari?.totalSellQuantity, "kg")}
                  </span>{" "}
                </p>
                <p>
                  રકમ:
                  <span className="font-bold text-xl">
                    {formatCurrency(calcData?.bajari?.totalSellAmount)}
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
                    {" "}
                    {formatNumber(
                      calcData?.makai?.totalBuyQuantity
                        ? calcData?.makai?.totalBuyQuantity
                        : 0,
                      "kg"
                    )}
                  </span>
                </p>
                <p>
                  રકમ:
                  <span className="font-bold text-xl">
                    {formatCurrency(
                      calcData?.makai?.totalBuyAmount
                        ? calcData?.makai?.totalBuyAmount
                        : 0
                    )}
                  </span>
                </p>
              </div>
              <div className="flex flex-col border p-1 rounded-md w-full shadow-md">
                <p className="text-center mb-2 font-semibold">કુલ વેચાણ</p>
                <p>
                  જથ્થો:
                  <span className="font-bold text-xl">
                    {formatNumber(
                      calcData?.makai?.totalSellQuantity
                        ? calcData?.makai?.totalSellQuantity
                        : 0,
                      "kg"
                    )}
                  </span>
                </p>
                <p>
                  રકમ: ₹ ₹
                  <span className="font-bold text-xl">
                    {formatCurrency(
                      calcData?.makai?.totalSellAmount
                        ? calcData?.makai?.totalSellAmount
                        : 0
                    )}
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
