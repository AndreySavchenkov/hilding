"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import driverIcon from "../public/driver.png";
import workerIcon from "../public/worker.png";
import { PageWrapper } from "@/components/PageWrapper/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="h-full w-full flex items-center justify-center">
        <div className="flex flex-col gap-12 items-center">
          <Button
            asChild
            className="group flex w-full max-w-[250px] h-[250px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-white/10 backdrop-blur-sm transition-all duration-500 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/25 hover:scale-105 relative"
          >
            <Link href="/worker">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col gap-6 items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-purple-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
                  <Image
                    src={workerIcon}
                    width={150}
                    height={150}
                    alt="worker icon"
                    className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-500">
                  Pracownik produkcji
                </span>
              </div>
            </Link>
          </Button>
          <Button
            asChild
            className="group flex w-full max-w-[250px] h-[250px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-white/10 backdrop-blur-sm transition-all duration-500 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/25 hover:scale-105 relative"
          >
            <Link href="/driver">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col gap-6 items-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-purple-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
                  <Image
                    src={driverIcon}
                    width={150}
                    height={150}
                    alt="driver icon"
                    className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-500">
                  Wózkowy
                </span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
