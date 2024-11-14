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
    <header className="bg-slate-700 text-white px-10 py-4 fixed top-0 left-0 w-full z-50">
      <div className="flex max-w-screen-lg m-auto items-center justify-between">
        <Link href="/">
          <Image src={homeIcon} width={50} height={50} alt="admin icon" />
        </Link>
        <Link href="/numbers">
          <Image src={numbersIcon} width={50} height={50} alt="numbers icon" />
        </Link>
        <div className="flex items-center gap-4">
          {deviceId && (
            <Image
              className="cursor-pointer"
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
