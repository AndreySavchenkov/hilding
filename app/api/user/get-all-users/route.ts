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
        isSubscribed: true,
        subscriptions: {
          select: {
            id: true,
            deviceId: true,
          },
        },
      },
    });

    const response = NextResponse.json(users, { status: 200 });

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );

    // Set headers for cache control
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("X-Request-Timestamp", new Date().toISOString());

    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
