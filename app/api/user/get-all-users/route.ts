import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        workerNumber: true,
        subscriptions: {
          select: {
            id: true,
            deviceId: true,
          },
        },
      },
    });

    const response = NextResponse.json(users);

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    response.headers.set("Vary", "Accept-Encoding")

    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
