"use client";

import { Button } from "@/components/ui/button";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import Link from "next/link";

export default function Home() {
  if (typeof window !== "undefined" && "Notification" in window) {
    Notification.requestPermission().then((permission) => {
      console.log("Notification permission status:", permission);
    });
  }

  usePushNotifications();

  return (
    <main className="flex flex-col justify-center gap-5 p-10">
      <Button asChild>
        <Link href="/worker">Продолжить как работник</Link>
      </Button>
      <Button asChild>
        <Link href="/driver">Продолжить как вузковый </Link>
      </Button>
      <Button asChild>
        <Link href="/admin">Продолжить как админ</Link>
      </Button>
    </main>
  );
}
