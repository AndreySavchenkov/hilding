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
    <header className="bg-gradient-to-r from-blue-900 via-slate-800 to-gray-900 backdrop-blur-sm bg-opacity-80 text-white px-10 py-4 fixed top-0 left-0 w-full z-50 border-b border-white/10 shadow-lg">
      <div className="flex max-w-screen-lg m-auto items-center justify-between">
        <Link href="/">
          <Image 
            src={homeIcon} 
            width={50} 
            height={50} 
            alt="admin icon" 
            className="transition-transform hover:scale-110 duration-300"
          />
        </Link>
        <Link href="/numbers">
          <Image 
            src={numbersIcon} 
            width={50} 
            height={50} 
            alt="numbers icon" 
            className="transition-transform hover:scale-110 duration-300"
          />
        </Link>
        <div className="flex items-center gap-4">
          {deviceId && (
            <Image
              className="cursor-pointer transition-transform hover:scale-110 duration-300"
              onClick={() => {
                if (typeof window !== "undefined") {
                  localStorage.removeItem("deviceId");
                  console.log("Device ID cleared");
                  clearDeviceId();
                  router.push("/");
                }
              }}
              src={exitIcon}
              width={50}
              height={50}
              alt="exit work icon"
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
