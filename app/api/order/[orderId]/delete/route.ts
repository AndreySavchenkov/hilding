import { db } from "@/lib/db";

import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { optionId: string } }
) {
  try {
    if (!params.optionId) {
      return new NextResponse("Not found", { status: 404 });
    }

    // delete order from the db
    const deletedTodo = await db.orderOptions.delete({
      where: {
        id: params.optionId,
      },
    });

    // Respond with the deleted todo
    return NextResponse.json(deletedTodo, { status: 200 });
  } catch (error) {
    console.log("[DELETE ORDER]", error);

    // Handle errors
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
