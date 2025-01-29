import AddTransactionForm from "@/Components/custom/AddTransactionForm";
import DailySummary from "@/Components/custom/DailySummary";
import Header from "@/Components/custom/Header";
import StockOverview from "@/Components/custom/StockOverview";
import TransactionList from "@/Components/custom/TransactionList";
import VisualReports from "@/Components/custom/VisualReports";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Fodder Business Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <AddTransactionForm />
            <TransactionList />
          </div>
          <div>
            <DailySummary />
            <StockOverview />
            <VisualReports />
          </div>
        </div>
      </main>
    </div>
  );
}
