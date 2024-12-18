"use client";

import { AreaOptionsEnum, OrderType, orderItems } from "@/types";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { CustomButton } from "@/components/ui/custom-button";
import { OrderItem } from "./components/order-item";

type Props = {
  item: OrderType;
  setOptions: (item: OrderType[] | null) => void;
};

export const Order = ({ item, setOptions }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const deleteOrder = async (orderId: string) => {
    setIsLoading(true);

    try {
      const apiUrl = `/api/order/${orderId}/delete`;

      const requestData = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(`Failed to delete`);
      }

      const responseItems = await fetch(`/api/order/get-order-options`, {
        cache: "no-store",
      });

      const data = await responseItems.json();

      setOptions(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        duration: 5000,
        title: "Some Error! :(",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      key={item.id}
      initial={{
        opacity: 0,
        scale: 0.8,
        y: -100, // начальная позиция выше на 100px
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0, // конечная позиция
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        x: 100,
        y: -100,
        rotate: 15,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      }}
      className="flex gap-3 flex-col text-gray-300 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm"
    >
      <span className="text-xl md:text-2xl font-medium text-center py-3 border-b border-gray-500/30 text-gray-200">
        Linia: {item.lineOptions} ({AreaOptionsEnum[item.areaOptions]})
      </span>

      <span className="text-sm text-gray-400 text-center">
        Zamówiono:{" "}
        {formatDistanceToNow(new Date(item.createdAt), {
          addSuffix: true,
          locale: pl,
        })}
      </span>

      <div className="flex gap-6 flex-col mt-2">
        <div className="flex gap-3 flex-col">
          {Object.entries(orderItems).map(([key, itemData]) => {
            if (item[key as keyof OrderType]) {
              return <OrderItem key={key} itemKey={key} item={itemData} />;
            }
            return null;
          })}
        </div>
      </div>
      <CustomButton
        isLoading={isLoading}
        text="Dostarczyć"
        onClick={() => deleteOrder(item.id)}
      />
    </motion.div>
  );
};
