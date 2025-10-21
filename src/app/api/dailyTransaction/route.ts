import { NextResponse } from "next/server";
import { db } from "../../../../db/connect";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const fodderData = await db.dailyTransaction.create({ data });
    return NextResponse.json({ SUCCESS: true, data: fodderData });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json({ SUCCESS: false, error: err });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "all";

    // 🎆 Define both Diwali dates (you can update every year)
    const previousDiwali = new Date("2024-11-01"); // previous year's Diwali
    const thisDiwali = new Date("2025-10-20"); // this year's Diwali

    let fodderData;

    if (period === "gaya_varsh") {
      // From previous Diwali to this Diwali
      fodderData = await db.dailyTransaction.findMany({
        where: {
          date: {
            gte: previousDiwali,
            lt: thisDiwali,
          },
        },
        orderBy: { date: "desc" },
      });
    } else if (period === "diwali_pachhi") {
      // After this Diwali
      fodderData = await db.dailyTransaction.findMany({
        where: {
          date: {
            gte: thisDiwali,
          },
        },
        orderBy: { date: "desc" },
      });
    } else {
      // All
      fodderData = await db.dailyTransaction.findMany({
        orderBy: { date: "desc" },
      });
    }
    fodderData = fodderData.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return NextResponse.json({ SUCCESS: true, data: fodderData });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ SUCCESS: false, error: err });
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const transId = url.searchParams.get("transId");
    const data = await req.json();
    if (transId) {
      const fodderData = await db.dailyTransaction.update({
        where: { id: transId },
        data: data,
      });
      return NextResponse.json({ SUCCESS: true, data: fodderData });
    }
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ SUCCESS: false, error: err });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const transId = url.searchParams.get("transId");
    if (transId) {
      const deletTrans = await db.dailyTransaction.delete({
        where: { id: transId },
      });
      return NextResponse.json({ SUCCESS: true });
    }
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ SUCCESS: false, error: err });
  }
}
