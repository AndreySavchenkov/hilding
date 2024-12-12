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
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

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
    <PageWrapper>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col gap-8 items-center">
          {deviceId ? (
            <>
              <Button
                asChild
                className="flex w-full max-w-[250px] h-[250px] bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                <Link href="/worker">
                  <div className="flex flex-col gap-6 items-center">
                    <Image
                      src={workerIcon}
                      width={150}
                      height={150}
                      alt="worker icon"
                    />
                    <span className="text-xl font-bold">Pracownik produkcji</span>
                  </div>
                </Link>
              </Button>
              <Button
                asChild
                className="flex w-full max-w-[250px] h-[250px] bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                <Link href="/driver">
                  <div className="flex flex-col gap-6 items-center">
                    <Image
                      src={driverIcon}
                      width={150}
                      height={150}
                      alt="worker icon"
                    />
                    <span className="text-xl font-bold">Wózkowy</span>
                  </div>
                </Link>
              </Button>
            </>
          ) : (
            <Button
              onClick={start}
              className="flex w-full max-w-[250px] h-[250px] bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
              <div className="flex flex-col gap-6 items-center">
                <Image
                  src={startIcon}
                  width={150}
                  height={150}
                  alt="start work icon"
                />
                <span className="text-xl font-bold">Rozpoczęcie pracy</span>
              </div>
            </Button>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
