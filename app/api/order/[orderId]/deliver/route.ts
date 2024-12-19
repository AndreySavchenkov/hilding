import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const body = await req.json();

    const deliveredOrder = await db.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        deliveredById: body.deliveredById,
        deliveredAt: body.deliveredAt,
      },
    });

    return NextResponse.json(deliveredOrder, { status: 200 });
  } catch (error) {
    console.log("[DELIVER ORDER]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
