import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    //fetch options from the db
    const options = await db.orderOptions.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // respond with the options
    return NextResponse.json(options, { status: 200 });
  } catch (error) {
    console.log("[GET ORDER_OPTIONS]", error);

    // Handle errors
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
