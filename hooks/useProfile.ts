import { useState } from "react";
import { useUser } from "./useUser";

export const useProfile = () => {
  const { user, clearUser } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLogout = () => {
    clearUser();
  };

  return { user, isDialogOpen, setIsDialogOpen, handleLogout };
};
