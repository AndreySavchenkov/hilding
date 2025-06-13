"use client";

import { useUser } from "@/hooks/useUser";
import { RegisterForm } from "./RegisterForm/RegisterForm";
import { Spinner } from "./ui/spinner";

interface AuthCheckProps {
  children: React.ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner />
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
