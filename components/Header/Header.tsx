"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { subscribeUser } from "../../app/actions";
import { v4 as uuidv4 } from "uuid";
import { urlBase64ToUint8Array } from "@/helpers/urlBase64ToUnit8Array";
import { registerServiceWorker } from "@/helpers/registerServiceWorker";
import Image from "next/image";
import adminIcon from "../../public/admin.png";
import homeIcon from "../../public/home.png";

export const Header = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    registerServiceWorker();

    const subscribeToPush = async () => {
      const existingDeviceId = localStorage.getItem("deviceId");

      if (existingDeviceId) {
        console.log("Подписка уже существует:", existingDeviceId);
        setDeviceId(existingDeviceId);
      } else {
        const newDeviceId = uuidv4();
        localStorage.setItem("deviceId", newDeviceId);
        setDeviceId(newDeviceId);

        try {
          const registration = await navigator.serviceWorker.ready;
          console.log("Service Worker готов:", registration);

          const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
            ),
          });

          console.log("sub", sub);

          const response = await subscribeUser(sub, newDeviceId);
          console.log("Response from subscribeUser:", response);
        } catch (error) {
          console.error("Ошибка подписки на пуш:", error);
        }
      }
    };

    if (typeof window !== "undefined") {
      subscribeToPush();
    }
  }, []);

  return (
    <header className="bg-slate-700 text-white px-10 py-4">
      <div className="flex max-w-screen-lg m-auto items-center justify-between">
        <Link href="/">
          <Image src={homeIcon} width={50} height={50} alt="admin icon" />
        </Link>
        <div className="flex items-center gap-4">
          {deviceId ? (
            <div>
              <Button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("deviceId");
                    console.log("Device ID cleared");
                    setDeviceId(null);
                  }
                }}
              >
                Закончить
              </Button>{" "}
              <span>DeviceID: {deviceId}</span>{" "}
            </div>
          ) : (
            <Button>Начать</Button>
          )}
          <Link href="/admin">
            <Image src={adminIcon} width={50} height={50} alt="admin icon" />
          </Link>
        </div>
      </div>
    </header>
  );
};
