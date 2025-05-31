import { useState } from "react";
import { useUser } from "./useUser";
import { useToast } from "@/components/ui/use-toast";
import { OrderType } from "@/types";

export const useDelivery = (setOptions: (item: OrderType[] | null) => void) => {
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const deleteOrder = async (orderId: string) => {
    setIsLoading(true);

    try {
      const apiUrl = `/api/order/${orderId}/deliver`;

      const requestData = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deliveredById: user?.id,
          deliveredAt: new Date(),
        }),
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(`Failed to delete`);
      }

      const responseItems = await fetch(`/api/order/get-orders-for-deliver`, {
        cache: "no-store",
      });

      const data = await responseItems.json();

      setOptions(data);
    } catch (error) {
      console.log(error);
      toast({
        duration: 5000,
        title: "Some Error! :(",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteOrder, isLoading };
};
