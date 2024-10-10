"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import driverIcon from "../public/driver.png";
import workerIcon from "../public/worker.png";
import startIcon from "../public/play.png";
import { useContext } from "react";
import { registerServiceWorker } from "@/helpers/registerServiceWorker";
import { v4 as uuidv4 } from "uuid";
import { urlBase64ToUint8Array } from "@/helpers/urlBase64ToUnit8Array";
import { subscribeUser } from "./actions";
import { DeviceIdContext } from "@/components/DeviceIdProvider/DeviceIdProvider";

export default function Home() {
  const deviceIdContext = useContext(DeviceIdContext);

  if (!deviceIdContext) {
    throw new Error("useContext must be used within DeviceIdProvider");
  }
  const { deviceId, setDeviceId, clearDeviceId } = deviceIdContext;

  const start = async () => {
    registerServiceWorker();

    const subscribeToPush = async () => {
      const existingDeviceId = deviceId;

      if (!existingDeviceId) {
        const newDeviceId = uuidv4();
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
  };

  return (
    <main className="flex flex-col justify-center items-center  gap-10 p-10 h-full">
      <>
        {deviceId ? (
          <>
            <Button asChild className="flex w-100% max-w-[250px] h-[250px]">
              <Link href="/worker">
                <div className="flex flex-col gap-6">
                  <Image
                    src={workerIcon}
                    width={150}
                    height={150}
                    alt="worker icon"
                  />
                  Pracownik
                </div>
              </Link>
            </Button>
            <Button asChild className="flex w-100% max-w-[250px] h-[250px]">
              <Link href="/driver">
                <div className="flex flex-col gap-6">
                  <Image
                    src={driverIcon}
                    width={150}
                    height={150}
                    alt="worker icon"
                  />
                  Wózkowy
                </div>
              </Link>
            </Button>
          </>
        ) : (
          <Button
            onClick={start}
            asChild
            className="flex w-full max-w-[250px] h-[250px]"
          >
            <div className="flex flex-col gap-6">
              <Image
                src={startIcon}
                width={150}
                height={150}
                alt="start work icon"
              />
              Rozpoczęcie pracy
            </div>
          </Button>
        )}
      </>
    </main>
  );
}
