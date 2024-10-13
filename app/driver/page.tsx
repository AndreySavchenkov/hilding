"use client";

import { OrderType } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import emptyStateIcon from "../../public/emptyState.png";
import { Order } from "./components/Order/Order";

export default function Driver() {
  const [options, setOptions] = useState<OrderType[] | null>(null);

  useEffect(() => {
    const fetchOrderOptions = async () => {
      try {
        const response = await fetch(`/api/order/get-order-options`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch Order Options: ${response.status}`);
        }

        const data = await response.json();
        setOptions(data);
      } catch (error: any) {
        console.error(`Error fetching items: ${error.message}`);
      }
    };

    fetchOrderOptions();
  }, []);

  if (!options) {
    return (
      <div className="flex gap-8 flex-col p-3">
        <div className="flex justify-center items-center text-2xl text-gray-400 h-[calc(100vh-107px)]">
          Loading...
        </div>
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div className="flex gap-8 flex-col p-3">
        <div className="flex justify-center items-center text-2xl text-gray-400 h-[calc(100vh-107px)]">
          <div className="flex flex-col gap-8 justify-center items-center">
            <Image
              src={emptyStateIcon}
              alt="empty state icon"
              width={64}
              height={64}
            />
            <span>Nie ma nowych zamówień</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-8 flex-col p-3">
      {options?.map((item) => (
        <Order key={item.id} item={item} setOptions={setOptions} />
      ))}
    </div>
  );
}
