"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { OrderType } from "@/types";
import { useEffect, useState } from "react";

export default function Driver() {
  const [options, setOptions] = useState<OrderType[] | null>(null);

  const { toast } = useToast();

  const deleteOrder = async (orderId: string) => {
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

      toast({
        title: "Заказ успешно удален!",
        variant: "destructive",
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchOrderOptions = async () => {
      try {
        const response = await fetch(`/api/order/get-order-options`, {
          next: { revalidate: 3600 },
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
    // call fetch fetchTodos
    fetchOrderOptions();
  }, []);

  return (
    <div className="flex gap-8 flex-col">
      {options ? (
        options?.map((item) => (
          <div key={item.id} className="flex gap-2 flex-col">
            <span>Worker Number: {item.workerNumber}</span>
            <span>Line Number: {item.lineOptions}</span>
            <span>Area: {item.areaOptions}</span>
            <div className="flex gap-8 flex-col">
              <h2>Заказ:</h2>
              <ul className="flex gap-4 flex-col">
                {item.pallets ? <li>Палеты</li> : null}
                {item.scotchTape ? <li>Скотч</li> : null}
                {item.whiteBraid ? <li>Белый стрейч</li> : null}
              </ul>
            </div>
            <Button onClick={() => deleteOrder(item.id)}>Delete</Button>
          </div>
        ))
      ) : (
        <div>aren&apos;t data or loading</div>
      )}
    </div>
  );
}
