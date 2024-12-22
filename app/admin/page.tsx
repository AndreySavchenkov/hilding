"use client";

import { useEffect, useState } from "react";
import { format, differenceInMinutes, differenceInHours } from "date-fns";
import { pl } from "date-fns/locale";
import { AreaOptionsEnum } from "@/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import refreshIcon from "@/public/refresh.png";
import Image from "next/image";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  workerNumber: string;
  subscriptions: {
    id: string;
    deviceId: string;
  }[];
}

const formatName = (firstName: string, lastName: string) => {
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const formattedLastName = lastName.charAt(0).toUpperCase();

  return `${formattedFirstName} ${formattedLastName}.`;
};

const calculateDeliveryTime = (createdAt: Date, deliveredAt: Date) => {
  const minutesDiff = differenceInMinutes(deliveredAt, createdAt);
  const hoursDiff = differenceInHours(deliveredAt, createdAt);

  if (hoursDiff > 0) {
    return `${hoursDiff} godz ${minutesDiff % 60} min`;
  }
  return `${minutesDiff} min`;
};

const getDeliveryTimeColor = (createdAt: Date, deliveredAt: Date) => {
  const minutesDiff = differenceInMinutes(deliveredAt, createdAt);

  if (minutesDiff <= 20) return "text-green-500";
  if (minutesDiff <= 60) return "text-yellow-500";
  return "text-red-500";
};

export default function Admin() {
  // const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      // const ordersResponse = await fetch("/api/order/get-admin-orders", { cache: "no-store" });
      // if (!ordersResponse.ok) {
      //   throw new Error("Ошибка при загрузке заказов");
      // }
      // const ordersData = await ordersResponse.json();
      // setOrders(ordersData);
  
      const usersResponse = await fetch("/api/user/get-all-users", { cache: "no-store" });
      if (!usersResponse.ok) {
        throw new Error("Ошибка при загрузке пользователей");
      }
      const usersData = await usersResponse.json();
      setUsers(usersData);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();

    // const interval = setInterval(() => {
    //   fetchData();
    // }, 10000);

    // return () => clearInterval(interval);
  }, []);

  console.log(users);

  const Header = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-100">
          Panel administratora
        </h1>
        <Image
          onClick={handleRefresh}
          src={refreshIcon}
          width={45}
          height={45}
          alt="Refresh data"
        />
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-2 py-6">
        <Header />
        <div className="min-h-[calc(100vh-220px)] flex items-center justify-center">
          <div className="text-xl text-gray-400 animate-pulse">
            Ładowanie...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 py-6">
      <div className="space-y-6">
        <Header />
        <div className="bg-gray-800 rounded-lg shadow-md p-4 md:p-8 border border-gray-700">
          <Accordion type="single" collapsible>
            <AccordionItem value="users" className="border-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-gray-200 hover:no-underline">
                Użytkownicy
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 md:p-6">
                      <p className="text-gray-400 text-center">
                        Brak użytkowników
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {users.map((user) => (
                        <div
                          key={user.id}
                          className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 flex items-center justify-between"
                        >
                          <div className="flex flex-col">
                            <span className="text-gray-200 font-medium">
                              {user.firstName} {user.lastName}
                            </span>
                            <span className="text-gray-400 text-sm">
                              Nr: {user.workerNumber}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs ${
                                user.subscriptions.length > 0
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-red-500/20 text-red-300"
                              }`}
                            >
                              {user.subscriptions.length > 0
                                ? "Powiadomienia włączone"
                                : "Powiadomienia wyłączone"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* <div className="bg-gray-800 rounded-lg shadow-md p-4 md:p-8 border border-gray-700">
          <Accordion type="single" collapsible>
            <AccordionItem value="orders" className="border-0">
              <AccordionTrigger className="text-lg md:text-xl font-semibold text-gray-200 hover:no-underline">
                Zamówienia
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 md:p-6">
                      <p className="text-gray-400 text-center">Brak zamówień</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 md:p-6"
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                              <div>
                                <h3 className="text-base md:text-lg font-medium text-gray-200">
                                  Linia: {order.lineOptions} (
                                  {
                                    AreaOptionsEnum[
                                      order.areaOptions as keyof typeof AreaOptionsEnum
                                    ]
                                  }
                                  )
                                </h3>
                                <div className="text-xs md:text-sm text-gray-400 mt-1 space-y-0.5">
                                  <p>
                                    Utworzono:{" "}
                                    {format(
                                      new Date(order.createdAt),
                                      "dd.MM.yyyy HH:mm",
                                      {
                                        locale: pl,
                                      }
                                    )}{" "}
                                  </p>
                                  {order.deliveredAt && (
                                    <p>
                                      Dostarczone w:{" "}
                                      <span
                                        className={`${getDeliveryTimeColor(
                                          new Date(order.createdAt),
                                          new Date(order.deliveredAt)
                                        )}`}
                                      >
                                        {calculateDeliveryTime(
                                          new Date(order.createdAt),
                                          new Date(order.deliveredAt)
                                        )}
                                      </span>
                                    </p>
                                  )}
                                </div>
                              </div>
                              <span
                                className={`self-start px-3 py-1 rounded-full text-xs md:text-sm ${
                                  order.deliveredAt
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-yellow-500/20 text-yellow-300"
                                }`}
                              >
                                {order.deliveredAt
                                  ? "Dostarczono"
                                  : "W trakcie"}
                              </span>
                            </div>

                            <div className="text-xs md:text-sm space-y-1">
                              <p className="text-gray-400">
                                Utworzył:{" "}
                                {formatName(
                                  order.createdBy.firstName,
                                  order.createdBy.lastName
                                )}{" "}
                                ({order.createdBy.workerNumber})
                              </p>
                              {order.deliveredBy && (
                                <p className="text-gray-400">
                                  Dostarczył:{" "}
                                  {formatName(
                                    order.deliveredBy.firstName,
                                    order.deliveredBy.lastName
                                  )}{" "}
                                  ({order.deliveredBy.workerNumber})
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div> */}
      </div>
    </div>
  );
}
