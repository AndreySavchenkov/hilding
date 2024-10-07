import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedTodo = await db.orderOptions.delete({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(deletedTodo, { status: 200 });
  } catch (error) {
    console.log("[DELETE ORDER]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
