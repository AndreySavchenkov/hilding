import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, workerNumber } = body;

    let user = await db.user.findFirst({
      where: { workerNumber },
    });

    if (user) {
      return NextResponse.json(user);
    }

    user = await db.user.create({
      data: {
        firstName,
        lastName,
        workerNumber,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
}
