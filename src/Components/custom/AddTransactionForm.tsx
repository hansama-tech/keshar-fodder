"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import axios from "axios";
// import { DatePicker } from "@/Components/ui/date-picker"
import { Calendar } from "@/Components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function AddTransactionForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fodderType, setFodderType] = useState("bajari");
  const [sellQuantity, setSellQuantity] = useState<number | undefined>();
  const [sellAmount, setSellAmount] = useState<number | undefined>();
  const [buyQuantity, setBuyQuantity] = useState<number | undefined>();
  const [buyAmount, setBuyAmount] = useState<number | undefined>();
  const [buyPrice, setBuyPrice] = useState<number | undefined>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const FooderData = await axios.post("/api/dailyTransaction", {
        date,
        fodderType,
        sellQuantity: sellQuantity || 0,
        sellAmount: sellAmount || 0,
        buyQuantity: buyQuantity || 0,
        buyAmount: buyAmount || 0,
        avgBuyPrice: buyPrice || 0,
      });
    } catch (err) {
      console.log("something wrong", err);
    }
    setDate(new Date());
    setFodderType("bajari");
    setSellQuantity(0);
    setSellAmount(0);
    setBuyQuantity(0);
    setBuyAmount(0);
    setBuyPrice(0);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>દૈનિક વ્યવહાર ઉમેરો</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
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

            <div className="space-y-2">
              <Label htmlFor="fodderType">કતાર પ્રકાર</Label>
              <Select value={fodderType} onValueChange={setFodderType}>
                <SelectTrigger id="fodderType">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bajari">બાજરી</SelectItem>
                  <SelectItem value="makai">મકાઈ</SelectItem>
                </SelectContent>
              </Select>
            </div>



            <div className="space-y-2 md:col-start-1">
              <Label htmlFor="sellQuantity">વેચાયેલ જથ્થો (kg)</Label>
              <Input
                required
                id="sellQuantity"
                type="number"
                value={sellQuantity ?? ""}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined;
                  setSellQuantity(value);
                }}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sellAmount">વેચાણ રકમ (₹)</Label>
              <Input
                required
                id="sellAmount"
                type="number"
                value={sellAmount ?? ""}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined;
                  setSellAmount(value);
                }}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyQuantity">ખરીદેલ જથ્થો (kg)</Label>
              <Input
                required
                id="buyQuantity"
                type="number"
                value={buyQuantity ?? ""}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined;
                  setBuyQuantity(value);
                }}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="buyAmount">ખરીદેલી કુલ રકમ (₹)</Label>
              <Input
                required
                id="buyAmount"
                type="number"
                value={buyAmount ?? ""}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined;
                  setBuyAmount(value);
                }}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buyPrice">ખરીદેલ કિંમત (₹/kg)</Label>
              <Input
                required
                id="buyPrice"
                type="number"
                value={buyPrice ?? ""}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined;
                  setBuyPrice(value);
                }}
                placeholder="0"
              />
            </div>

          </div>

          <Button type="submit" className="w-full md:w-auto">Add Transaction</Button>
        </form>
      </CardContent>
    </Card>
  );
}
