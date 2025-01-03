"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import noIcon from "../../public/no.png";
import Image from "next/image";
import { NumbersIKEA } from "@/types";
import MediumIcon from "../../public/medium.svg";
import FirmIcon from "../../public/firm.svg";
import XFirmIcon from "../../public/x-firm.svg";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface WorkerResult {
  name: string;
  number: string;
}

type FormType = {
  workerNumber?: string;
};

const formSchema: ZodType<FormType> = z.object({
  workerNumber: z
    .string({
      required_error: "Numer musi składać się z 8 znaków",
    })
    .min(8, {
      message: "Numer musi składać się z 8 znaków",
    }),
});

export default function Numbers() {
  const [result, setResult] = useState<WorkerResult | null>(null);
  const [isOpenResult, setIsOpenResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentDate = format(new Date(), "dd.MM.yyyy", { locale: pl });
  const currentWeek = format(new Date(), "w", { locale: pl });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const { reset } = form;

  const handleClose = () => {
    setIsOpenResult(false);
    setResult(null);
    reset();
  };

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    try {
      setIsLoading(true);
      const number = NumbersIKEA.find(
        (item) => item.number.replace(/\./g, "") === data.workerNumber
      );
      setResult(number || null);
    } finally {
      setIsLoading(false);
      setIsOpenResult(true);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900">
      {isOpenResult ? (
        <div className="w-full max-w-screen-lg px-4 mx-auto h-full flex items-center justify-center">
          {result ? (
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
          ) : (
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
          )}
        </div>
      ) : (
        <div className="w-full max-w-screen-lg px-4 mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center w-full pt-10"
            >
              <div className="flex flex-col gap-5 w-full">
                <FormField
                  control={form.control}
                  name="workerNumber"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-center">
                      <FormLabel className="text-3xl font-black bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent mb-10 tracking-wide">
                        Numer IKEA:
                      </FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={8}
                          containerClassName="gap-0"
                          {...field}
                        >
                          <InputOTPGroup className="m-0 p-0 gap-0 group">
                            {[0, 1, 2].map((index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="text-white text-4xl h-14 bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-white/50"
                              />
                            ))}
                          </InputOTPGroup>

                          <span className="text-blue-300 text-5xl font-bold animate-pulse">
                            .
                          </span>

                          <InputOTPGroup>
                            {[3, 4, 5].map((index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="text-white text-4xl h-14 bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-white/50"
                              />
                            ))}
                          </InputOTPGroup>

                          <span className="text-blue-300 text-5xl font-bold animate-pulse">
                            .
                          </span>

                          <InputOTPGroup>
                            {[6, 7].map((index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="text-white text-4xl h-14 bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-white/50"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage className="text-red-400 mt-4 animate-shake font-semibold" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={isLoading}
                className="max-w-md w-full mt-12 py-12 text-3xl bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-bold tracking-wide rounded-xl"
                type="submit"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-pulse">Szukam</span>
                    <span className="animate-bounce">...</span>
                  </span>
                ) : (
                  "Szukać"
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
