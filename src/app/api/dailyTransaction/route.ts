import { NextResponse } from "next/server";
import { db } from "../../../../db/connect";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const fodderData = await db.dailyTransaction.create({ data });
    return NextResponse.json({ SUCCESS: true, data: fodderData });
  } catch (err) {
    return NextResponse.json({ SUCCESS: true, data: null });
  }
}
export async function GET(req: Request) {
  try {
    const fodderData = await db.dailyTransaction.findMany({});
    return NextResponse.json({ SUCCESS: true, data: fodderData });
  } catch (err) {
    return NextResponse.json({ SUCCESS: true, data: null });
  }
}
