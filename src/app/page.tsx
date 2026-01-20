"use client";
import AddTransactionForm from "@/Components/custom/AddTransactionForm";
import DailySummary from "@/Components/custom/DailySummary";
import DetailedReports from "@/Components/custom/DetailedReports";
import Header from "@/Components/custom/Header";
import StockOverview from "@/Components/custom/StockOverview";
import TransactionList from "@/Components/custom/TransactionList";
import VisualReports from "@/Components/custom/VisualReports";
// import { Select } from "@/Components/ui/select";
import Image from "next/image";
// import "../app/globals.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useState } from "react";

export default function Home() {
  const [days, setDays] = useState("diwali_pachhi");
  console.log(days);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your daily fodder transactions and stock.</p>
          </div>

          <div className="flex items-center gap-2">
            <Select value={days} onValueChange={setDays}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diwali_pela">આ દિવાળી પહેલા</SelectItem>
                <SelectItem value="diwali_pachhi">દિવાળી પછી</SelectItem>
                <SelectItem value="all">બધા દિવસો</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <AddTransactionForm />
            <TransactionList days={days} />
          </div>
          <div className="space-y-8">
            <StockOverview days={days} />
            <DailySummary />
            {/* <VisualReports /> */}
            {/* <DetailedReports/> */}
          </div>
        </div>
      </main>
    </div>
  );
}
