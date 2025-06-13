"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { SignOutDialog } from "./components/SignOutDialog/SignOutDialog";
import { getRoleName } from "@/helpers/getRoleName";
import { useProfile } from "@/hooks/useProfile";

export default function Profile() {
  const { user, isDialogOpen, setIsDialogOpen, handleLogout } = useProfile();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-gray-200 mb-6">
          Profil użytkownika
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Imię i nazwisko</span>
            <span className="text-gray-200 text-lg">
              {user?.firstName} {user?.lastName}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Numer pracownika</span>
            <span className="text-gray-200 text-lg">{user?.workerNumber}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-400 text-sm">Rola</span>
            <span className="text-gray-200 text-lg">
              {user?.role ? getRoleName(user.role) : ""}
            </span>
          </div>

          <div className="pt-4">
            <CustomButton
              onClick={() => setIsDialogOpen(true)}
              text="Wyloguj się"
              isLoading={false}
              className="mt-0 py-4 text-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600"
            />
          </div>
        </div>
      </div>

      <SignOutDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        handleLogout={handleLogout}
      />
    </div>
  );
}
