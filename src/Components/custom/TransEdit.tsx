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
import { Calendar as CalendarIcon, PenBox } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

const TransEdit = (props: any) => {
  const [date, setDate] = useState<Date | undefined>(props.data.date);
  const [fodderType, setFodderType] = useState(props.data.fodderType);
  const [sellQuantity, setSellQuantity] = useState(props.data.sellQuantity);
  const [sellAmount, setSellAmount] = useState(props.data.sellAmount);
  const [buyQuantity, setBuyQuantity] = useState(props.data.buyQuantity);
  const [buyAmount, setBuyAmount] = useState(props.data.buyAmount);
  const [buyPrice, setBuyPrice] = useState(props.data.avgBuyPrice);

  console.log(props.data);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const FooderData = await axios.put(
        `/api/dailyTransaction?transId=${props.data.id}`,
        {
          date,
          fodderType,
          sellQuantity,
          sellAmount,
          buyQuantity,
          buyAmount,
          avgBuyPrice: buyPrice,
        }
      );
    } catch (err) {
      console.log("something wrong", err);
    }
  };

  return (
    <main>
      <Dialog>
        <DialogTrigger>
        <PenBox className=" cursor-pointer" /></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> દૈનિક વ્યવહાર Update</DialogTitle>
            <DialogDescription>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow mb-8"
              >
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
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
                    <Label htmlFor="fodderType">કતાર પ્રકાર</Label>
                    <Select value={fodderType} onValueChange={setFodderType}>
                      <SelectTrigger id="fodderType">
                        <SelectValue placeholder="Select fodder type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bajari">બાજરી</SelectItem>
                        <SelectItem value="makai">મકાઈ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sellQuantity">વેચાયેલ જથ્થો (kg)</Label>
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
                    <Label htmlFor="sellAmount">વેચાણ રકમ (₹)</Label>
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
                    <Label htmlFor="buyQuantity">ખરીદેલ જથ્થો (kg)</Label>
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
                    <Label htmlFor="buyAmount">ખરીદેલી કુલ રકમ (₹)</Label>
                    <Input
                      required
                      id="buyAmount"
                      type="number"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      placeholder="Enter buy amount"
                    />
                  </div>
                  <div>
                    <Label htmlFor="buyQuantity">ખરીદેલ કિંમત (₹/kg)</Label>
                    <Input
                      required
                      id="buyPrice"
                      type="number"
                      value={buyPrice}
                      onChange={(e) => setBuyPrice(e.target.value)}
                      placeholder="Enter buy Price"
                    />
                  </div>
                  <Button type="submit">Add Transaction</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default TransEdit;
