import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

import MediumIcon from "../../../../public/medium.svg";
import FirmIcon from "../../../../public/firm.svg";
import XFirmIcon from "../../../../public/x-firm.svg";

import { WorkerResultType } from "../../page";

type ResultStateProps = {
  handleClose: () => void;
  result: WorkerResultType;
};

export const ResultState = ({ handleClose, result }: ResultStateProps) => {
  const currentDate = format(new Date(), "dd.MM.yyyy", { locale: pl });
  const currentWeek = format(new Date(), "w", { locale: pl });

  return (
    <div className="flex flex-col gap-4 items-center animate-fadeIn">
      <div className="absolute top-[80px] right-2 md:top-8 md:right-8 text-white/80 text-right self-end mb-4 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
        <p className="text-lg md:text-xl font-medium tracking-wider">
          {currentDate}
        </p>
        <p className="text-sm md:text-base font-light">
          Tydzień: {currentWeek}
        </p>
      </div>
      <div className="relative flex justify-center w-full mb-8">
        <div className="relative flex items-center justify-center w-32 h-32">
          <div className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-green-500/50 blur-md animate-pulse -translate-x-1" />
          {result.name.includes("M-FIRM") ? (
            <MediumIcon className="w-full h-full transform hover:scale-110 transition-transform duration-300 fill-green-400 relative z-10" />
          ) : result.name.includes("X-FIRM") ? (
            <XFirmIcon className="w-full h-full transform hover:scale-110 transition-transform duration-300 fill-green-400 relative z-10" />
          ) : (
            <FirmIcon className="w-full h-full transform hover:scale-110 transition-transform duration-300 fill-green-400 relative z-10" />
          )}
        </div>
      </div>
      <span className="text-3xl font-black bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent animate-slideDown text-center">
        {result.name}
      </span>
      <span className="text-2xl font-bold text-gray-200 animate-slideUp backdrop-blur-sm bg-white/10 px-6 py-2 rounded-lg text-center">
        {result.number}
      </span>
      <Button
        className="max-w-md w-full mt-12 py-10 text-2xl bg-gradient-to-r from-green-500 to-emerald-700 hover:from-green-600 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-green-500/50"
        onClick={handleClose}
      >
        OK
      </Button>
    </div>
  );
};
