"use client";

import { useUser } from "@/hooks/useUser";
import { RegisterForm } from "./RegisterForm";

interface AuthCheckProps {
  children: React.ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <RegisterForm />
      </div>
    );
  }

  return <>{children}</>;
}
