"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Driver() {
  const [options, setOptions] = useState(null);

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

      // refresh page on successful request
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
          <div key={item.index} className="flex gap-2 flex-col">
            <span>Worker Number: {item.workerNumber}</span>
            <span>Line Number: {item.lineOptions}</span>
            <span>Area: {item.areaOptions}</span>
            <Button onClick={() => deleteOrder(item.id)}>Delete</Button>
          </div>
        ))
      ) : (
        <div>aren&apos;t data or loading</div>
      )}
    </div>
  );
}
