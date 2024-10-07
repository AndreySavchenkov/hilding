"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { subscribeUser } from "./actions";
import { v4 as uuidv4 } from "uuid";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+") // Исправлено регулярное выражение
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            icon{" "}
          </span>
          and then Add to Home Screen
          <span role="img" aria-label="plus icon">
            {" "}
            +{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    // Функция для подписки на пуш-уведомления
    const subscribeToPush = async () => {
      const existingDeviceId = localStorage.getItem("deviceId");

      if (existingDeviceId) {
        console.log("Подписка уже существует:", existingDeviceId);
        setDeviceId(existingDeviceId);
      } else {
        const newDeviceId = uuidv4();
        localStorage.setItem("deviceId", newDeviceId);
        setDeviceId(newDeviceId);

        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
          ),
        });

        console.log("sub", sub);
        await subscribeUser(sub, newDeviceId);
      }
    };

    // Вызов функции подписки
    if (typeof window !== "undefined") {
      subscribeToPush();
    }
  }, []);

  return (
    <main className="flex flex-col justify-center gap-5 p-10">
      <Button asChild>
        <Link href="/worker">Продолжить как работник</Link>
      </Button>
      <Button asChild>
        <Link href="/driver">Продолжить как вузковый </Link>
      </Button>
      <Button asChild>
        <Link href="/admin">Продолжить как админ</Link>
      </Button>
      <div className="flex flex-col gap-10 mt-40">
        <div className="flex flex-col gap-5">
          DeviceID: {deviceId}
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                // Очищаем deviceId в localStorage
                localStorage.removeItem("deviceId");
                console.log("Device ID cleared");
                // Сбрасываем состояние deviceId
                setDeviceId(null);
              }
            }}
          >
            Clear
          </button>
        </div>
        <InstallPrompt />
      </div>
    </main>
  );
}
