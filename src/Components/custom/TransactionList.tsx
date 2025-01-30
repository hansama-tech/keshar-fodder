"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
// import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/Components/ui/label";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";

// Mock data for demonstration
const initialTransactions = [
  {
    id: 1,
    date: "2023-07-01",
    fodderType: "Bajari",
    sellQuantity: 500,
    sellAmount: 30000,
    buyQuantity: 1000,
    buyAmount: 50000,
  },
  {
    id: 2,
    date: "2023-07-01",
    fodderType: "Makai",
    sellQuantity: 300,
    sellAmount: 18000,
    buyQuantity: 800,
    buyAmount: 40000,
  },
  {
    id: 3,
    date: "2023-06-30",
    fodderType: "Bajari",
    sellQuantity: 600,
    sellAmount: 36000,
    buyQuantity: 1200,
    buyAmount: 60000,
  },
  {
    id: 4,
    date: "2023-06-30",
    fodderType: "Makai",
    sellQuantity: 400,
    sellAmount: 24000,
    buyQuantity: 900,
    buyAmount: 45000,
  },
];

export default function TransactionList() {
  const [transactionDatas, setTransactionDatas] = useState(initialTransactions);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [date, setDate] = useState<Date | undefined>(new Date());

  const filteredTransactions = selectedDate
    ? transactionDatas.filter(
        (t) => t.date === selectedDate.toISOString().split("T")[0]
      )
    : transactionDatas;

  const getTransactionData = async () => {
    try {
      const Data = await axios.get("/api/dailyTransaction");
      setTransactionDatas(Data.data.data.reverse());
    } catch (err) {
      console.log("something wrong", err);
    }
  };

  useEffect(() => {
    getTransactionData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Daily Transactions</h2>
      <div className="mb-4">
        <Label htmlFor="dateFilter">Filter by Date</Label>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* <DatePicker id="dateFilter" selected={selectedDate} onSelect={(date) => setSelectedDate(date)} /> */}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date </TableHead>
            <TableHead>Fodder Type</TableHead>
            <TableHead>Sell Quantity (kg)</TableHead>
            <TableHead>Sell Amount (₹)</TableHead>
            <TableHead>Buy Quantity (kg)</TableHead>
            <TableHead>Buy Amount (₹)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionDatas.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {new Date(transaction.date)
                  .toLocaleDateString("en-GB")
                  .split("/")
                  .join("-")}
              </TableCell>
              <TableCell>{transaction.fodderType}</TableCell>
              <TableCell>{transaction.sellQuantity}</TableCell>
              <TableCell>{transaction.sellAmount}</TableCell>
              <TableCell>{transaction.buyQuantity}</TableCell>
              <TableCell>{transaction.buyAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
