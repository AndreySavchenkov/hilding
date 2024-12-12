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
import yesIcon from "../../public/yes.png";
import noIcon from "../../public/no.png";
import Image from "next/image";
import { NumbersIKEA } from "@/types";

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
    <div className="h-full bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900 flex items-center justify-center">
      <div className="w-full max-w-screen-lg px-4 flex items-center justify-center">
        {isOpenResult ? (
          result ? (
            <div className="flex flex-col gap-4 items-center justify-center animate-fadeIn">
              <div className="relative">
                <div className="absolute -inset-1 bg-green-500 rounded-full blur opacity-75 animate-pulse"></div>
                <Image
                  className="relative mb-6 transform hover:scale-110 transition-transform duration-300"
                  src={yesIcon}
                  width={75}
                  height={75}
                  alt="yes icon"
                />
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
            <div className="flex flex-col gap-4 items-center justify-center animate-fadeIn">
              <div className="relative">
                <div className="absolute -inset-1 bg-red-500 rounded-full blur opacity-75 animate-pulse"></div>
                <Image
                  className="relative mb-6 transform hover:scale-110 transition-transform duration-300"
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
          )
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-center w-full"
            >
              <div className="flex flex-col gap-5 w-full">
                <FormField
                  control={form.control}
                  name="workerNumber"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-center">
                      <FormLabel className="text-slate-100 text-2xl mb-10 font-bold tracking-wide">
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
                                className="text-zinc-800 text-4xl h-14 bg-opacity-80 backdrop-blur-sm bg-white/20 border-zinc-500 transition-all duration-300 hover:bg-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ))}
                          </InputOTPGroup>

                          <span className="text-slate-200 text-5xl animate-pulse">.</span>

                          <InputOTPGroup>
                            {[3, 4, 5].map((index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="text-zinc-800 text-4xl h-14 bg-opacity-80 backdrop-blur-sm bg-white/20 border-zinc-500 transition-all duration-300 hover:bg-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ))}
                          </InputOTPGroup>

                          <span className="text-slate-200 text-5xl animate-pulse">.</span>

                          <InputOTPGroup>
                            {[6, 7].map((index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className="text-zinc-800 text-4xl h-14 bg-opacity-80 backdrop-blur-sm bg-white/20 border-zinc-500 transition-all duration-300 hover:bg-white/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage className="text-red-400 mt-4 animate-shake" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                disabled={isLoading}
                className="max-w-md mt-12 py-10 px-20 text-2xl bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-blue-600 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {isLoading ? "Szukam..." : "Szukać"}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
