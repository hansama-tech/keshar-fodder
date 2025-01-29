"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
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
  const [sellQuantity, setSellQuantity] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [buyPrice, setBuyPrice] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const FooderData = await axios.post("/api/dailyTransaction", {
        date,
        fodderType,
        sellQuantity,
        sellAmount,
        buyQuantity,
        buyAmount,
        avgBuyPrice: buyPrice,
      });
    } catch (err) {
      console.log("something wrong", err);
    }
    setDate(new Date());
    setFodderType("bajari");
    setSellQuantity("");
    setSellAmount("");
    setBuyQuantity("");
    setBuyAmount("");
    setBuyPrice("")
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow mb-8"
    >
      <h2 className="text-xl font-semibold mb-4">Add Daily Transaction</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="date">Date</Label>
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
          {/* <DatePicker id="date" selected={date} onSelect={(date) => setDate(date)} /> */}
        </div>
        <div>
          <Label htmlFor="fodderType">Fodder Type</Label>
          <Select value={fodderType} onValueChange={setFodderType}>
            <SelectTrigger id="fodderType">
              <SelectValue placeholder="Select fodder type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bajari">Bajari</SelectItem>
              <SelectItem value="makai">Makai</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sellQuantity">Sell Quantity (kg)</Label>
          <Input
            required
            id="sellQuantity"
            type="number"
            value={sellQuantity}
            onChange={(e) => setSellQuantity(e.target.value)}
            placeholder="Enter sell quantity"
          />
        </div>
        <div>
          <Label htmlFor="sellAmount">Sell Amount (₹)</Label>
          <Input
            required
            id="sellAmount"
            type="number"
            value={sellAmount}
            onChange={(e) => setSellAmount(e.target.value)}
            placeholder="Enter sell amount"
          />
        </div>
        <div>
          <Label htmlFor="buyQuantity">Buy Quantity (kg)</Label>
          <Input
            required
            id="buyQuantity"
            type="number"
            value={buyQuantity}
            onChange={(e) => setBuyQuantity(e.target.value)}
            placeholder="Enter buy quantity"
          />
        </div>
        <div>
          <Label htmlFor="buyQuantity">Buy Price (₹/kg)</Label>
          <Input
            required
            id="buyPrice"
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            placeholder="Enter buy Price"
          />
        </div>
        <div>
          <Label htmlFor="buyAmount">Buy Amount (₹)</Label>
          <Input
            required
            id="buyAmount"
            type="number"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            placeholder="Enter buy amount"
          />
        </div>
        <Button type="submit">Add Transaction</Button>
      </div>
    </form>
  );
}
