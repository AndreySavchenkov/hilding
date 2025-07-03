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
      className="flex w-full h-[200px] sm:h-[250px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
    >
      <Link href={href}>
        <div className="flex flex-col gap-4 sm:gap-6 items-center">
          <Image
            src={icon}
            width={60}
            height={60}
            className="sm:w-20 sm:h-20"
            alt="worker icon"
          />

          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
            {title}
          </span>
        </div>
      </Link>
    </Button>
  );
};
