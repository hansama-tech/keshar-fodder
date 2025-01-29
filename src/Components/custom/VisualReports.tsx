"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for demonstration
const initialData = {
  "7days": [
    { date: "2023-06-25", sellQuantity: 800, sellAmount: 48000, buyQuantity: 1000, buyAmount: 50000 },
    { date: "2023-06-26", sellQuantity: 850, sellAmount: 51000, buyQuantity: 1100, buyAmount: 55000 },
    { date: "2023-06-27", sellQuantity: 900, sellAmount: 54000, buyQuantity: 1200, buyAmount: 60000 },
    { date: "2023-06-28", sellQuantity: 950, sellAmount: 57000, buyQuantity: 1300, buyAmount: 65000 },
    { date: "2023-06-29", sellQuantity: 1000, sellAmount: 60000, buyQuantity: 1400, buyAmount: 70000 },
    { date: "2023-06-30", sellQuantity: 1050, sellAmount: 63000, buyQuantity: 1500, buyAmount: 75000 },
    { date: "2023-07-01", sellQuantity: 1100, sellAmount: 66000, buyQuantity: 1600, buyAmount: 80000 },
  ],
  "30days": [
    // Add more data points for 30 days
  ],
  "90days": [
    // Add more data points for 90 days
  ],
}

export default function VisualReports() {
  const [timePeriod, setTimePeriod] = useState("7days")
  const [data, setData] = useState(initialData)

  useEffect(() => {
    // Fetch data from API based on timePeriod
    // For now, we'll use the mock data
    setData(initialData)
  }, [timePeriod]) //Removed unnecessary dependencies

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Sales and Purchases Over Time</CardTitle>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data[timePeriod as keyof typeof data]}>
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Bar yAxisId="left" dataKey="sellQuantity" name="Sell Quantity" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="buyQuantity" name="Buy Quantity" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

