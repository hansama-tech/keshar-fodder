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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">
          Fodder Business Admin Dashboard
        </h1>
        <div className="flex justify-end py-1">
          <Select value={days} onValueChange={setDays}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diwali_pela">આ દિવાળી પહેલા</SelectItem>
              <SelectItem value="diwali_pachhi">દિવાળી પછી</SelectItem>
              <SelectItem value="all">બધા દિવસો</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <AddTransactionForm />
            <TransactionList days={days} />
          </div>
          <div>
            <DailySummary />
            <StockOverview days={days} />
            {/* <VisualReports /> */}
            {/* <DetailedReports/> */}
          </div>
        </div>
      </main>
    </div>
  );
}
