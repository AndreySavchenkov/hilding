"use client";

import Link from "next/link";
import { useContext } from "react";
import Image from "next/image";
// import adminIcon from "../../public/admin.png";
import homeIcon from "../../public/home.png";
import exitIcon from "../../public/power.png";
import numbersIcon from "../../public/numbers.png";
import { DeviceIdContext } from "../DeviceIdProvider/DeviceIdProvider";
import { useRouter } from "next/navigation";

export const Header = () => {
  const deviceIdContext = useContext(DeviceIdContext);
  const router = useRouter();

  if (!deviceIdContext) {
    throw new Error("useContext must be used within DeviceIdProvider");
  }
  const { deviceId, clearDeviceId } = deviceIdContext;

  return (
    <header className="bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 backdrop-blur-md 
      text-white px-6 sm:px-10 py-3 fixed top-0 left-0 w-full z-50 
      border-b border-white/20 shadow-xl">
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
          {deviceId && (
            <Image
              className="cursor-pointer transform hover:scale-105 transition-all duration-200 
                hover:brightness-110 active:scale-95"
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("deviceId");
                  console.log("Device ID cleared");
                  clearDeviceId();
                  router.push("/");
                }
              }}
              src={exitIcon}
              width={45}
              height={45}
              alt="Выйти"
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
