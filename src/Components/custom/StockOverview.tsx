"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import axios from "axios";
import calculateFodderTotals from "../Functions/Calculatetransaction";
import { cn } from "@/lib/utils";
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
  const getTransactionData = useCallback(async () => {
    try {
      const Data = await axios.get(
        `/api/dailyTransaction?period=${props.days || days}`
      );
      setTransactionDatas(Data.data.data);
    } catch (err) {
      console.log("something wrong", err);
    }
  }, [props.days, days]);

  useEffect(() => {
    getTransactionData();
  }, [getTransactionData]);

  useEffect(() => {
    if (transactionDatas) {
      const calculateData = calculateFodderTotals(transactionDatas);
      setCalcData(calculateData);
      console.log(calculateData);
    }
  }, [transactionDatas]);

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">સ્ટોક ડેશબોર્ડ</h2>
      </div>

      {/* Total Section */}
      <Card className="border-l-4 border-l-primary/50">
        <CardHeader>
          <CardTitle className="text-lg">કુલ સારાંશ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="કુલ ખરીદેલ"
              quantity={calcData?.bajari?.totalBuyQuantity + (calcData?.makai?.totalBuyQuantity || 0)}
              amount={calcData?.bajari?.totalBuyAmount + (calcData?.makai?.totalBuyAmount || 0)}
              type="expense"
            />
            <StatCard
              title="કુલ વેચાણ"
              quantity={calcData?.bajari?.totalSellQuantity + (calcData?.makai?.totalSellQuantity || 0)}
              amount={calcData?.bajari?.totalSellAmount + (calcData?.makai?.totalSellAmount || 0)}
              type="income"
            />
            <StatCard
              title="બાકી જથ્થો"
              quantity={
                (calcData?.bajari?.totalBuyQuantity + (calcData?.makai?.totalBuyQuantity || 0)) -
                (calcData?.bajari?.totalSellQuantity + (calcData?.makai?.totalSellQuantity || 0))
              }
              amount={
                (calcData?.bajari?.totalSellAmount + (calcData?.makai?.totalSellAmount || 0)) -
                (calcData?.bajari?.totalBuyAmount + (calcData?.makai?.totalBuyAmount || 0))
              }
              type="neutral"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bajari Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-primary">બાજરી</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                title="કુલ ખરીદેલ"
                quantity={calcData?.bajari?.totalBuyQuantity}
                amount={calcData?.bajari?.totalBuyAmount}
                compact
                type="expense"
              />
              <StatCard
                title="કુલ વેચાણ"
                quantity={calcData?.bajari?.totalSellQuantity}
                amount={calcData?.bajari?.totalSellAmount}
                compact
                type="income"
              />
            </div>
            <div className="pt-2 border-t">
              <StatCard
                title="બાકી જથ્થો"
                quantity={calcData?.bajari?.totalBuyQuantity - calcData?.bajari?.totalSellQuantity}
                amount={calcData?.bajari?.totalSellAmount - calcData?.bajari?.totalBuyAmount}
                type="neutral"
              />
            </div>
          </CardContent>
        </Card>

        {/* Makai Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-secondary-foreground">મકાઈ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                title="કુલ ખરીદેલ"
                quantity={calcData?.makai?.totalBuyQuantity}
                amount={calcData?.makai?.totalBuyAmount}
                compact
                type="expense"
              />
              <StatCard
                title="કુલ વેચાણ"
                quantity={calcData?.makai?.totalSellQuantity}
                amount={calcData?.makai?.totalSellAmount}
                compact
                type="income"
              />

            </div>
            <div className="pt-2 border-t">
              <StatCard
                title="બાકી જથ્થો"
                quantity={calcData?.makai?.totalBuyQuantity - calcData?.makai?.totalSellQuantity}
                amount={calcData?.makai?.totalSellAmount - calcData?.makai?.totalBuyAmount}
                type="neutral"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, quantity, amount, type = "neutral", compact = false }: { title: string, quantity: number, amount: number, type?: "income" | "expense" | "neutral", compact?: boolean }) {
  const isIncome = type === "income";
  const isExpense = type === "expense";

  return (
    <div className={cn("p-4 rounded-lg border bg-card/50", compact ? "p-3" : "p-4")}>
      <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-tight">
          {formatNumber(quantity || 0, "kg")}
        </span>
        <span className={cn(
          "text-sm font-semibold mt-1",
          isIncome ? "text-green-600" : isExpense ? "text-red-500" : "text-muted-foreground"
        )}>
          {formatCurrency(amount || 0)}
        </span>
      </div>
    </div>
  )
}
