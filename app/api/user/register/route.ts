import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { registerSchema } from "@/types/schemas";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Валидация данных на сервере
    const validatedData = registerSchema.parse(body);
    const { firstName, lastName, workerNumber, role } = validatedData;

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
        role: role.value, // Извлекаем значение из объекта
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);

    // Обработка ошибок валидации
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
