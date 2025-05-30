"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type WorkerLinkProps = {
  icon: StaticImageData;
  title: string;
  href: string;
};

export const WorkerLink = ({ icon, title, href }: WorkerLinkProps) => {
  return (
    <Button
      asChild
      className="group flex w-full max-w-[250px] h-[250px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-white/10 backdrop-blur-sm transition-all duration-500 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/25 hover:scale-105 relative"
    >
      <Link href={href}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex flex-col gap-6 items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-purple-600 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity duration-500" />
            <Image
              src={icon}
              width={150}
              height={150}
              alt="worker icon"
              className="relative transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-500">
            {title}
          </span>
        </div>
      </Link>
    </Button>
  );
};
