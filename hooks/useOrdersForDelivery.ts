import { OrderType } from "@/types";
import { useEffect, useState } from "react";

export const useOrdersForDelivery = () => {
  const [orders, setOrders] = useState<OrderType[] | null>(null);

  useEffect(() => {
    const fetchOrderOptions = async () => {
      try {
        const response = await fetch(`/api/order/get-orders-for-deliver`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch Order Options: ${response.status}`);
        }

        const data = await response.json();

        setOrders(data);
      } catch (error: any) {
        console.error("Error fetching items:", error);
      }
    };

    fetchOrderOptions();
  }, []);

  return { orders, setOrders };
}