"use client";

import { Order } from "./components/Order/Order";
import { AnimatePresence } from "framer-motion";
import { EmptyState } from "./components/EmptyState/EmptyState";
import { LoadingState } from "./components/LoadingState/LoadingState";
import { useOrdersForDelivery } from "@/hooks/useOrdersForDelivery";

export default function Driver() {
  const { orders, setOrders } = useOrdersForDelivery();

  if (!orders) {
    return <LoadingState />;
  }

  if (orders.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:gap-8">
        <AnimatePresence>
          {orders?.map((item) => (
            <Order key={item.id} item={item} setOptions={setOrders} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
