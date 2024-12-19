import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// off cache
export const revalidate = 0;

export async function GET() {
  try {
    const options = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("Options from DB:", options);

    const response = NextResponse.json(options, { status: 200 });

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );

    return response;
  } catch (error) {
    console.log("[GET ORDER_OPTIONS]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
