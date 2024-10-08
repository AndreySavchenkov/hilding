"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import driverIcon from "../public/driver.png";
import workerIcon from "../public/worker.png";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center  gap-5 p-10">
      <Button asChild className="flex w-100% max-w-[250px] h-[250px]">
        <Link href="/worker" className="flex flex-col gap-5">
          <Image src={workerIcon} width={150} height={150} alt="worker icon" />
          Продолжить как работник
        </Link>
      </Button>
      <Button asChild className="flex w-100% max-w-[250px] h-[250px]">
        <Link href="/driver" className="flex flex-col gap-5">
          <Image src={driverIcon} width={150} height={150} alt="worker icon" />
          Продолжить как вузковый
        </Link>
      </Button>
    </main>
  );
}
