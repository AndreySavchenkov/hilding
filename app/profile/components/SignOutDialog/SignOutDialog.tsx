import { CustomButton } from "@/components/ui/custom-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const SignOutDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  handleLogout,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleLogout: () => void;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-800 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-200">
              Potwierdzenie wylogowania
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Czy na pewno chcesz się wylogować?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-4 mt-4">
            <CustomButton
              onClick={() => setIsDialogOpen(false)}
              text="Nie"
              isLoading={false}
              className="mt-0 py-4 text-xl bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600"
            />
            <CustomButton
              onClick={handleLogout}
              text="Tak"
              isLoading={false}
              className="mt-0 py-4 text-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
  );
};