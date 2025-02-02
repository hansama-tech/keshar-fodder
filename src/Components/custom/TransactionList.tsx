"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

// import { DatePicker } from "@/components/ui/date-picker"
import { Label } from "@/Components/ui/label";
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import {
  Calendar as CalendarIcon,
  Delete,
  Drumstick,
  PenBox,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import TransEdit from "./TransEdit";

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

  const deletTrans = async (transId: any) => {
    if (transId) {
      try {
        const transdata = await axios.delete(
          `/api/dailyTransaction?transId=${transId}`
        );
        window.location.replace("/");
        console.log("delete Trans Successfully");
      } catch (err) {
        console.error("something wrong", err);
      }
    }
  };

  return (
    <div className="bg-white p-2 md:p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">દૈનિક વ્યવહારો</h2>
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
      <div>
        <div className="flex flex-col gap-2">
          {transactionDatas.map((transaction) => (
            <div
              key={transaction.id}
              className="border rounded-lg p-2 flex flex-wrap  gap-4 "
            >
              <p className="font-bold">
                {new Date(transaction.date)
                  .toLocaleDateString("en-GB")
                  .split("/")
                  .join("-")}
              </p>
              <p className="">
                કતાર પ્રકાર:{" "}
                <span>
                  {transaction.fodderType === "bajari" ? "બાજરી" : "મકાઈ"}
                </span>
              </p>
              <p className="">
                વેચાયેલ જથ્થો(kg): <span>{transaction.sellQuantity}</span>
              </p>
              <p className="">
                વેચાણ રકમ(₹): <span>{transaction.sellAmount}</span>
              </p>
              <p className="">
                ખરીદેલી કુલ રકમ (₹) <span>{transaction.buyAmount}</span>
              </p>
              
              <div className="flex gap-4 ">
                <TransEdit data={transaction} />

                <AlertDialog>
                  <AlertDialogTrigger>
                    {" "}
                    <Delete className="text-red-700 cursor-pointer" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete Transaction and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={()=>deletTrans(transaction.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>તારીખ </TableHead>
            <TableHead>કતાર પ્રકાર</TableHead>
            <TableHead>વેચાયેલ જથ્થો (kg)</TableHead>
            <TableHead>વેચાણ રકમ (₹)</TableHead>
            <TableHead>ખરીદેલ જથ્થો (kg)</TableHead>
            <TableHead>ખરીદેલી કુલ રકમ (₹)</TableHead>
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
      </Table> */}
    </div>
  );
}
