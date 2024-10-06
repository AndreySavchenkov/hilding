import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notifyDrivers } from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const { orderOptions } = await req.json();

    if (!orderOptions) {
      return new NextResponse("orderOptions required", { status: 400 });
    }

    // Создаём заказ
    const order = await db.orderOptions.create({
      data: { ...orderOptions },
    });

    // Получаем подписки всех водителей
    const subscriptions = await db.driverSubscription.findMany();

    // Отправляем уведомления
    for (const subscription of subscriptions) {
      await notifyDrivers(order);
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Ошибка создания заказа:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
