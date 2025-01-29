import { NextResponse } from "next/server";
import { db } from "../../../../db/connect";

export default async function POST(req: Request) {
  const data = await req.json();
  try {
    const fodderData = await db.dailyTransaction.create({ data });
    return NextResponse.json({ SUCCESS: true, data: fodderData });
  } catch (err) {
    return NextResponse.json({ SUCCESS: true, data: null });
  }
}
