"use client";

import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

interface CustomButtonProps {
  isLoading: boolean;
  text?: string;
  onClick?: () => void;
}

export const CustomButton = ({
  isLoading,
  text = "Dalej",
  onClick,
}: CustomButtonProps) => {
  return (
    <Button
      disabled={isLoading}
      className={cn(
        "max-w-md w-full mt-12 py-10 text-3xl",
        "bg-gradient-to-r from-blue-600 to-purple-600",
        "hover:from-blue-500 hover:to-purple-500",
        "transition-all duration-300 shadow-lg",
        "hover:shadow-purple-500/20 hover:scale-105",
        "disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100",
        "font-bold tracking-wide rounded-xl",
        isLoading && "from-blue-600/60 to-purple-600/60"
      )}
      type="submit"
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <ReloadIcon className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        text
      )}
    </Button>
  );
};
