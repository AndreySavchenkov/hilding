import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// off cache
export const revalidate = 0;

export async function GET() {
  try {
    const undeliveredOrders = await db.order.findMany({
      where: {
        deliveredAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = NextResponse.json(undeliveredOrders, { status: 200 });

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );

    return response;
  } catch (error) {
    console.error("[GET ORDER_OPTIONS] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
