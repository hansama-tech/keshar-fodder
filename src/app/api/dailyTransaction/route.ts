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
  // try {
    const fodderData = await db.dailyTransaction.findMany();
    return NextResponse.json({ SUCCESS: true, data: fodderData });
  // } catch (err) {
  //   console.error("GET Error:", err);
  //   return NextResponse.json({ SUCCESS:false, error: err });
  // }
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
