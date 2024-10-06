import { useEffect } from "react";

// Ваш код для преобразования ключа
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Кастомный хук
export const usePushNotifications = () => {
  useEffect(() => {
    const registerPushNotifications = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");

          // Ждем активации Service Worker
          if (registration.waiting || registration.installing) {
            console.log("Ожидание активации Service Worker...");
            const serviceWorker = registration.waiting || registration.installing;
            await new Promise((resolve) => {
              const onStateChange = () => {
                if (serviceWorker?.state === "activated") {
                  resolve(serviceWorker);
                }
              };
              serviceWorker?.addEventListener("statechange", onStateChange);
            });
          }

          // Получаем ключ VAPID и подписываемся
          const applicationServerKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!);
          console.log("applicationServerKey ->", applicationServerKey);

          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey,
          });

          // Отправляем подписку на сервер
          await fetch("/api/save-subscription", {
            method: "POST",
            body: JSON.stringify(subscription),
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("Подписка на уведомления прошла успешно:", subscription);
        } catch (error) {
          console.error("Ошибка при подписке на push-уведомления:", error);
        }
      } else {
        console.error("Push уведомления не поддерживаются вашим браузером.");
      }
    };

    // Вызов функции внутри useEffect
    registerPushNotifications();
  }, []);
};
