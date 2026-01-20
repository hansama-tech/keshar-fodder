"use client";


import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";

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

export default function TransactionList(props: any) {
  const [transactionDatas, setTransactionDatas] = useState(initialTransactions);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState(props.days || "diwali_pachhi");

  console.log(props);

  const filteredTransactions = selectedDate
    ? transactionDatas.filter(
      (t) => t.date === selectedDate.toISOString().split("T")[0]
    )
    : transactionDatas;

  const getTransactionData = async () => {
    try {
      const res = await axios.get(
        `/api/dailyTransaction?period=${props.days || days}`
      );
      setTransactionDatas(res.data.data);
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle>દૈનિક વ્યવહારો</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col gap-1.5">
            <Label className="text-muted-foreground">Filter by Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal border-input",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {transactionDatas.map((transaction) => (
              <div
                key={transaction.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border bg-card hover:shadow-md transition-all gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      {transaction.fodderType === "bajari" ? "બાજરી" : "મકાઈ"}
                    </span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {new Date(transaction.date)
                        .toLocaleDateString("en-GB")
                        .split("/")
                        .join("-")}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    કતાર પ્રકાર: {transaction.fodderType === "bajari" ? "બાજરી" : "મકાઈ"}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">વેચાયેલ જથ્થો (kg)</span>
                    <span className="font-medium">{transaction.sellQuantity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">વેચાણ રકમ(₹)</span>
                    <span className="font-medium text-green-600">+{transaction.sellAmount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">ખરીદેલ જથ્થો (kg)</span>
                    <span className="font-medium">{transaction.buyQuantity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">ખરીદેલી કુલ રકમ (₹)</span>
                    <span className="font-medium text-red-500">-{transaction.buyAmount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 mt-2 sm:mt-0">
                  <TransEdit data={transaction} />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                        <Delete className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete Transaction?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently remove this record.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deletTrans(transaction.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
