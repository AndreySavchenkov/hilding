import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 0;

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
    });

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );

    return response;
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
