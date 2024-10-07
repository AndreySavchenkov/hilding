"use server";

import { db } from "@/lib/db";
import { PushSubscription } from "@/types";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:sannndvik16@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: any, deviceId: string) {
  const { endpoint, keys } = sub; // Извлекаем данные из подписки
  await db.driverSubscription.create({
    data: {
      endpoint: endpoint,
      p256dh: keys.p256dh,
      auth: keys.auth,
      deviceId,
    },
  });
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
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
