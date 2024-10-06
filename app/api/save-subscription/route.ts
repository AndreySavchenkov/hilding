import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const subscription = await req.json();

    // Убедись, что subscription имеет нужные ключи
    if (!subscription.keys || !subscription.keys.p256dh || !subscription.keys.auth) {
      return NextResponse.json({ message: 'Подписка невалидна' }, { status: 400 });
    }

    // Сохраняем подписку в базе данных
    await db.driverSubscription.create({
      data: {
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    });

    return NextResponse.json({ message: 'Подписка сохранена' }, { status: 200 });
  } catch (error) {
    console.error('Ошибка сохранения подписки:', error);
    return NextResponse.json({ message: 'Ошибка сохранения подписки' }, { status: 500 });
  }
}
