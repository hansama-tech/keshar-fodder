"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

export default function StockOverview() {
  const [stockOverview, setStockOverview] = useState({
    bajari: {
      currentStock: 0,
      stockValue: 0,
    },
    makai: {
      currentStock: 0,
      stockValue: 0,
    },
  })

  useEffect(() => {
    // Fetch stock overview data from API
    // For now, we'll use mock data
    setStockOverview({
      bajari: {
        currentStock: 3000,
        stockValue: 150000,
      },
      makai: {
        currentStock: 2000,
        stockValue: 100000,
      },
    })
  }, [])

  const totalStock = stockOverview.bajari.currentStock + stockOverview.makai.currentStock
  const totalValue = stockOverview.bajari.stockValue + stockOverview.makai.stockValue

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Stock Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Bajari</h3>
            <p>Current Stock: {stockOverview.bajari.currentStock} kg</p>
            <p>Stock Value: ₹{stockOverview.bajari.stockValue}</p>
          </div>
          <div>
            <h3 className="font-semibold">Makai</h3>
            <p>Current Stock: {stockOverview.makai.currentStock} kg</p>
            <p>Stock Value: ₹{stockOverview.makai.stockValue}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Total</h3>
          <p>Current Stock: {totalStock} kg</p>
          <p>Stock Value: ₹{totalValue}</p>
        </div>
      </CardContent>
    </Card>
  )
}

