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
      <div className="min-h-screen p-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-xl font-semibold text-gray-600 animate-pulse">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (options.length === 0) {
    return (
      <div className="min-h-screen p-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Image
              src={emptyStateIcon}
              alt="empty state icon"
              width={80}
              height={80}
              className="mx-auto mb-6 opacity-70"
            />
            <span className="text-xl font-medium text-gray-500">
              Nie ma nowych zamówień
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:gap-8">
        {options?.map((item) => (
          <Order key={item.id} item={item} setOptions={setOptions} />
        ))}
      </div>
    </div>
  );
}
