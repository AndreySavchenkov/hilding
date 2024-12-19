"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  clearUser: () => void;
  isLoading: boolean;
}

interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  workerNumber: string;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(`/api/user/${userId}`);
          if (response.ok) {
            const userData = await response.json();
            setUserState(userData);
          } else {
            localStorage.removeItem("userId");
          }
        } catch (error) {
          console.error("Ошибка при получении данных пользователя:", error);
          localStorage.removeItem("userId");
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const setUser = (newUser: UserType | null) => {
    setUserState(newUser);
    if (newUser?.id) {
      localStorage.setItem("userId", newUser.id);
    } else {
      localStorage.removeItem("userId");
    }
  };

  const clearUser = () => {
    localStorage.removeItem("userId");
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
