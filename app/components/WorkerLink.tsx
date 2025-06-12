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
      className="flex   w-[250px] h-[250px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg"
    >
      <Link href={href}>
        <div className="flex flex-col gap-6 items-center">
          <Image src={icon} width={80} height={80} alt="worker icon" />

          <span className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent ">
            {title}
          </span>
        </div>
      </Link>
    </Button>
  );
};
