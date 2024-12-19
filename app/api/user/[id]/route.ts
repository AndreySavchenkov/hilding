import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        workerNumber: true,
      },
    });

    if (!user) {
      return new NextResponse("Пользователь не найден", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
