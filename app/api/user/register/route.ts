import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, workerNumber } = body;

    const existingUser = await db.user.findUnique({
      where: { workerNumber },
    });

    if (existingUser) {
      return new NextResponse("Пользователь уже существует", { status: 400 });
    }

    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        workerNumber,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
