import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const fetchCache = 'force-no-store';

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

    const response = NextResponse.json(users, {
      status: 200,
      headers: {
        "Cache-Control": "max-age=1",
        "CDN-Cache-Control": "max-age=1",
        "Vercel-CDN-Cache-Control": "max-age=1",
      },
    });

    // Set headers for cache control
    // response.headers.set(
    //   "Cache-Control",
    //   "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    // );
    // response.headers.set("Pragma", "no-cache");
    // response.headers.set("Expires", "0");
    // response.headers.set("Vary", "*");
    // response.headers.set("X-Request-Timestamp", new Date().toISOString());

    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
