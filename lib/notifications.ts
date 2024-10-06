import { db } from "@/lib/db"; // Импорт клиента Prisma
import { OrderType, PushSubscription } from "../types";
import webpush from "web-push"; // Импортируем web-push

// Настройка VAPID ключей
webpush.setVapidDetails(
  "mailto:sannndvik16@gmail.com", // Ваш email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!, // Публичный ключ из .env
  process.env.VAPID_PRIVATE_KEY! // Приватный ключ из .env
);

export async function notifyDrivers(order: OrderType) {
  // Получаем все подписки водителей из базы данных
  const subscriptions = await db.driverSubscription.findMany();

  // Проходим по каждой подписке и отправляем уведомления
  for (const subscription of subscriptions) {
    // Преобразуем подписку в формат PushSubscription
    const pushSubscription: PushSubscription = {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.p256dh,
        auth: subscription.auth,
      },
    };

    // Отправляем уведомление
    await sendNotificationToDriver(pushSubscription, order);
  }
}

// Пример функции отправки уведомлений
async function sendNotificationToDriver(
  subscription: PushSubscription,
  order: OrderType
) {
  const payload = JSON.stringify({
    title: "Новый заказ!",
    message: `Появился новый заказ: ${order.lineOptions}`,
  });

  try {
    // Отправляем уведомление с помощью web-push
    await webpush.sendNotification(subscription, payload, {});

  } catch (error) {
    console.error("Ошибка отправки уведомления:", error);
  }
}
