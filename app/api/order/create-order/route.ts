import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendNotification } from "@/app/actions";

export async function POST(req: NextRequest) {
  try {
    const { orderOptions } = await req.json();

    if (!orderOptions) {
      return new NextResponse("orderOptions required", { status: 400 });
    }

    const order = await db.order.create({
      data: {
        ...orderOptions,
        deliveredAt: null,
      },
    });

    await sendNotification(
      `Nowe zamówienie surowców dla ${orderOptions.lineOptions}`
    );

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error creating order:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
