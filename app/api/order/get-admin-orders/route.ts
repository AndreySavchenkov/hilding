import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  try {
    const orders = await db.order.findMany({
      include: {
        createdBy: {
          select: {
            firstName: true,
            lastName: true,
            workerNumber: true,
          },
        },
        deliveredBy: {
          select: {
            firstName: true,
            lastName: true,
            workerNumber: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = NextResponse.json(orders, { status: 200 });

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );

    return response;
  } catch (error) {
    console.log("[GET_ADMIN_ORDERS]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
