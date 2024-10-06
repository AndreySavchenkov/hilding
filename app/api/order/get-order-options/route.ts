import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const options = await db.orderOptions.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("Options from DB:", options);

    const response = NextResponse.json(options, { status: 200 });

    response.headers.append(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.append("Pragma", "no-cache");
    response.headers.append("Expires", "0");

    return response;
  } catch (error) {
    console.log("[GET ORDER_OPTIONS]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
