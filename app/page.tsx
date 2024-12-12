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
        <div className="flex flex-col gap-12 items-center">
          {deviceId ? (
            <>
              <Button
                asChild
                className="group flex w-full max-w-[250px] h-[250px] bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 border border-white/10 backdrop-blur-sm transition-all duration-500 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/25 hover:scale-105 relative"
              >
                <Link href="/worker">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex flex-col gap-6 items-center">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
                      <Image
                        src={workerIcon}
                        width={150}
                        height={150}
                        alt="worker icon"
                        className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:to-indigo-400 transition-all duration-500">
                      Pracownik produkcji
                    </span>
                  </div>
                </Link>
              </Button>
              <Button
                asChild
                className="group flex w-full max-w-[250px] h-[250px] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-white/10 backdrop-blur-sm transition-all duration-500 rounded-xl overflow-hidden shadow-lg hover:shadow-emerald-500/25 hover:scale-105 relative"
              >
                <Link href="/driver">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex flex-col gap-6 items-center">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-emerald-500 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
                      <Image
                        src={driverIcon}
                        width={150}
                        height={150}
                        alt="driver icon"
                        className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-200 to-teal-300 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-teal-400 transition-all duration-500">
                      Wózkowy
                    </span>
                  </div>
                </Link>
              </Button>
            </>
          ) : (
            <Button
              onClick={start}
              className="group flex w-full max-w-[250px] h-[250px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-white/10 backdrop-blur-sm transition-all duration-500 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/25 hover:scale-105 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col gap-6 items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-purple-500 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
                  <Image
                    src={startIcon}
                    width={150}
                    height={150}
                    alt="start work icon"
                    className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-200 to-pink-300 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-400 transition-all duration-500">
                  Rozpoczęcie pracy
                </span>
              </div>
            </Button>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
