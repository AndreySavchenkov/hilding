import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { orderOptions } = await req.json();

    if (!orderOptions) {
      return new NextResponse("orderOptions required", { status: 400 });
    }

    const order = await db.orderOptions.create({
      data: { ...orderOptions },
    });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Ошибка создания заказа:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
