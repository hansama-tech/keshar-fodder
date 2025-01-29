"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

export default function DailySummary() {
  const [dailySummary, setDailySummary] = useState({
    bajari: {
      sell: { quantity: 0, amount: 0 },
      buy: { quantity: 0, amount: 0 },
    },
    makai: {
      sell: { quantity: 0, amount: 0 },
      buy: { quantity: 0, amount: 0 },
    },
  })

  useEffect(() => {
    // Fetch daily summary data from API
    // For now, we'll use mock data
    setDailySummary({
      bajari: {
        sell: { quantity: 500, amount: 30000 },
        buy: { quantity: 1000, amount: 50000 },
      },
      makai: {
        sell: { quantity: 300, amount: 18000 },
        buy: { quantity: 800, amount: 40000 },
      },
    })
  }, [])

  const totalSellQuantity = dailySummary.bajari.sell.quantity + dailySummary.makai.sell.quantity
  const totalSellAmount = dailySummary.bajari.sell.amount + dailySummary.makai.sell.amount
  const totalBuyQuantity = dailySummary.bajari.buy.quantity + dailySummary.makai.buy.quantity
  const totalBuyAmount = dailySummary.bajari.buy.amount + dailySummary.makai.buy.amount
  const netEarnings = totalSellAmount - totalBuyAmount

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Daily Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Bajari</h3>
            <p>
              Sell: {dailySummary.bajari.sell.quantity} kg (₹{dailySummary.bajari.sell.amount})
            </p>
            <p>
              Buy: {dailySummary.bajari.buy.quantity} kg (₹{dailySummary.bajari.buy.amount})
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Makai</h3>
            <p>
              Sell: {dailySummary.makai.sell.quantity} kg (₹{dailySummary.makai.sell.amount})
            </p>
            <p>
              Buy: {dailySummary.makai.buy.quantity} kg (₹{dailySummary.makai.buy.amount})
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Total</h3>
          <p>
            Sell: {totalSellQuantity} kg (₹{totalSellAmount})
          </p>
          <p>
            Buy: {totalBuyQuantity} kg (₹{totalBuyAmount})
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Net Earnings</h3>
          <p className={netEarnings >= 0 ? "text-green-600" : "text-red-600"}>₹{netEarnings}</p>
        </div>
      </CardContent>
    </Card>
  )
}

