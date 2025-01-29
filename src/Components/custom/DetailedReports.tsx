"use client"

import { useState } from "react"
import { Button } from "@/Components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"

// Mock data for demonstration
const transactions = [
  { id: 1, date: "2023-07-01", type: "Buy", quantity: 1000, amount: 50000, unitPrice: 50 },
  { id: 2, date: "2023-07-01", type: "Sell", quantity: 500, amount: 30000, unitPrice: 60 },
  { id: 3, date: "2023-06-30", type: "Buy", quantity: 1500, amount: 75000, unitPrice: 50 },
  { id: 4, date: "2023-06-30", type: "Sell", quantity: 800, amount: 48000, unitPrice: 60 },
  // Add more mock transactions as needed
]

export default function DetailedReports() {
  const [dateRange, setDateRange] = useState("7")

  const handleExport = () => {
    // Implement export functionality here
    console.log("Exporting data...")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1">
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="dateRange">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleExport}>Export</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity (kg)</TableHead>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Unit Price (₹/kg)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.quantity}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.unitPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

