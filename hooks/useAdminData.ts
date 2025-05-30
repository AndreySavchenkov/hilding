import { useEffect, useState } from "react";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  workerNumber: string;
  isSubscribed: boolean;
  subscriptions: {
    id: string;
    deviceId: string;
  }[];
};

export const useAdminData = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const [ordersResponse, usersResponse] = await Promise.all([
        fetch("/api/order/get-admin-orders", { cache: "no-store" }),
        fetch("/api/user/get-all-users", { cache: "no-store" }),
      ]);

      if (!ordersResponse.ok || !usersResponse.ok) {
        throw new Error("Error when loading data");
      }

      const [ordersData, usersData] = await Promise.all([
        ordersResponse.json(),
        usersResponse.json(),
      ]);

      setOrders(ordersData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    orders,
    users,
    isLoading,
    fetchData,
  };
};
