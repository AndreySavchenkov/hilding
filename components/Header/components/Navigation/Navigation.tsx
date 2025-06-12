"use client";

import { useUser } from "@/hooks/useUser";
import { UserNavigation } from "./components/UserNavigation/UserNavigation";
import { UnregisterNavigation } from "./components/UnregisterNavigation/UnregisterNavigation";

export const Navigation = () => {
  const { user } = useUser();
  return <>{user ? <UserNavigation /> : <UnregisterNavigation />}</>;
};
