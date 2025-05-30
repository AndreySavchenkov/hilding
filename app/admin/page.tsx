"use client";

import { Header } from "./components/Header/Header";
import { Users } from "./components/Users/Users";
import { Orders } from "./components/Orders/Orders";
import { useAdminData } from "@/hooks/useAdminData";
import { Spinner } from "@/components/ui/spinner";

export default function Admin() {
  const { users, orders, fetchData, isLoading } = useAdminData();

  return (
    <div className="container mx-auto px-2 py-6">
      <div className="space-y-6">
        <Header handleRefresh={fetchData} />
        {isLoading ? (
          <div className="min-h-[calc(100vh-220px)] flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            <Users users={users} />
            <Orders orders={orders} />
          </>
        )}
      </div>
    </div>
  );
}
