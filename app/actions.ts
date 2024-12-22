"use server";

import { db } from "@/lib/db";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:sannndvik16@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function subscribeUser(
  sub: any,
  deviceId: string,
  userId: string
) {
  const { endpoint, keys } = sub;

  console.log(`deviceId ${deviceId}`);

  await db.driverSubscription.create({
    data: {
      endpoint: endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
      deviceId,
      userId,
    },
  });

// Обновляем поле isSubscribed у пользователя
await db.user.update({
  where: { id: userId },
  data: { isSubscribed: true },
});

  return { success: true };
}

export async function unsubscribeUser(deviceId: string, userId: string) {
  try {
    await db.driverSubscription.deleteMany({
      where: {
        deviceId: deviceId,
      },
    });

    await db.user.update({
      where: { id: userId },
      data: { isSubscribed: false },
    });

    return { success: true };
  } catch (error) {
    console.error("Ошибка при удалении подписки:", error);
    return { success: false, error };
  }
}

export async function sendNotification(message: string) {
  const subscriptions = await db.driverSubscription.findMany(); // Получаем все подписки

  for (const subscription of subscriptions) {
    const pushSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.p256dh,
        auth: subscription.auth,
      },
    };

    try {
      await webpush.sendNotification(
        pushSubscription,
        JSON.stringify({
          title: "Новое уведомление",
          body: message, // Сообщение, которое вы хотите отправить
          icon: "/notification.png", // Иконка уведомления
        })
      );
    } catch (error) {
      console.error("Ошибка при отправке пуш-уведомления:", error);
    }
  }

  return { success: true };
}
