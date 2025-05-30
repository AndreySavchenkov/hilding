import { Button } from "@/components/ui/button";
import noIcon from "../../../../public/no.png";
import Image from "next/image";

type NoFoundStateProps = {
  handleClose: () => void;
};

export const NoFoundState = ({ handleClose }: NoFoundStateProps) => {
  return (
    <div className="flex flex-col gap-4 items-center animate-fadeIn">
      <div className="relative flex items-center justify-center w-32 h-32">
        <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-red-500/50 blur-md animate-pulse -translate-x-1" />
        <Image
          className="relative transform hover:scale-110 transition-transform duration-300 z-10"
          src={noIcon}
          width={75}
          height={75}
          alt="numbers icon"
        />
      </div>
      <span className="text-3xl font-black bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent animate-slideDown text-center">
        Numer nie został odnaleziony
      </span>
      <Button
        className="max-w-md w-full mt-12 py-10 text-2xl bg-gradient-to-r from-red-500 to-rose-700 hover:from-red-600 hover:to-rose-800 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
        onClick={handleClose}
      >
        OK
      </Button>
    </div>
  );
};
