"use client";

import Link from "next/link";
import { useContext } from "react";
import Image from "next/image";
// import adminIcon from "../../public/admin.png";
import homeIcon from "../../public/home.png";
import exitIcon from "../../public/power.png";
import notificationIcon from "../../public/notification.png";
import numbersIcon from "../../public/numbers.png";
import { DeviceIdContext } from "../DeviceIdProvider/DeviceIdProvider";
import { useRouter } from "next/navigation";
import { registerServiceWorker } from "@/helpers/registerServiceWorker";
import { v4 as uuidv4 } from "uuid";
import { urlBase64ToUint8Array } from "@/helpers/urlBase64ToUnit8Array";
import { subscribeUser, unsubscribeUser } from "@/app/actions";

export const Header = () => {
  const deviceIdContext = useContext(DeviceIdContext);
  const router = useRouter();

  if (!deviceIdContext) {
    throw new Error("useContext must be used within DeviceIdProvider");
  }
  const { deviceId, setDeviceId, clearDeviceId } = deviceIdContext;

  const handleStart = async () => {
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

  const handleLogout = async () => {
    if (typeof window !== "undefined" && deviceId) {
      try {
        // Удаляем подписку из базы данных
        await unsubscribeUser(deviceId);

        // Очищаем локальное состояние
        localStorage.removeItem("deviceId");
        clearDeviceId();
        router.push("/");
      } catch (error) {
        console.error("Ошибка при удалении подписки:", error);
      }
    }
  };

  return (
    <header
      className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 backdrop-blur-md 
      text-white px-6 sm:px-10 py-3 fixed top-0 left-0 w-full z-50 
      border-b border-white/20 shadow-xl"
    >
      <div className="flex max-w-screen-xl mx-auto items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src={homeIcon}
            width={45}
            height={45}
            alt="Домашняя страница"
            className="transform hover:scale-105 transition-all duration-200 hover:brightness-110"
          />
        </Link>
        <Link href="/numbers" className="hover:opacity-80 transition-opacity">
          <Image
            src={numbersIcon}
            width={45}
            height={45}
            alt="Страница чисел"
            className="transform hover:scale-105 transition-all duration-200 hover:brightness-110"
          />
        </Link>
        <div className="flex items-center gap-4">
          {deviceId ? (
            <Image
              className="cursor-pointer transform hover:scale-105 transition-all duration-200 
                hover:brightness-110 active:scale-95"
              onClick={handleLogout}
              src={exitIcon}
              width={45}
              height={45}
              alt="Выйти"
            />
          ) : (
            <Image
              className="cursor-pointer transform hover:scale-105 transition-all duration-200 
                hover:brightness-110 active:scale-95"
              onClick={handleStart}
              src={notificationIcon}
              width={45}
              height={45}
              alt="notification icon"
            />
          )}
          {/* <Link href="/admin">
            <Image src={adminIcon} width={50} height={50} alt="admin icon" />
          </Link> */}
        </div>
      </div>
    </header>
  );
};
