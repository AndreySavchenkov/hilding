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
  const [result, setResult] = useState<null | {
    name: String;
    number: String;
  }>(null);
  const [isOpenResult, setIsOpenResult] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const { reset } = form;

  const handleClose = () => {
    setIsOpenResult(false);
    setResult(null);
    reset();
  };

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const removeDots = (number: string) => number.replace(/\./g, "");

    const number = NumbersIKEA.find(
      (item) => removeDots(item.number) === data.workerNumber
    );

    number ? setResult(number) : setResult(null);

    setIsOpenResult(true);
    console.log(number);
  };

  return (
    <div className="max-w-screen-lg mx-auto py-10 h-full">
      {isOpenResult ? (
        result ? (
          <div className="flex flex-col h-full px-8 gap-4 items-center">
            <Image
              className="mb-6"
              src={yesIcon}
              width={75}
              height={75}
              alt="yes icon"
            />
            <span className="text-3xl font-black text-green-300 text-center">
              {result?.name}
            </span>
            <span className="text-2xl font-bold text-gray-800 text-center">
              {result?.number}
            </span>
            <Button
              className="max-w-md w-full mt-12 py-10 text-2xl text-slate-100"
              onClick={handleClose}
            >
              OK
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full px-8 gap-4 items-center">
            <Image
              className="mb-6"
              src={noIcon}
              width={75}
              height={75}
              alt="numbers icon"
            />
            <span className="text-3xl font-black text-red-400 text-center">
              Numer nie został odnaleziony
            </span>
            <Button
              className="max-w-md w-full mt-12 py-10 text-2xl text-slate-100"
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
            className="flex flex-col items-center h-full px-2"
          >
            <div className="flex flex-col gap-5 w-full">
              <FormField
                control={form.control}
                name="workerNumber"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col items-center">
                    <FormLabel className="text-slate-100 text-2xl mb-10">
                      Numer IKEA:
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={8}
                        containerClassName="gap-0"
                        {...field}
                      >
                        <InputOTPGroup className="m-0 p-0 gap-0">
                          <InputOTPSlot
                            index={0}
                            className="text-zinc-800 text-4xl h-14  bg-[#dadbdb] border-zinc-500"
                          />
                          <InputOTPSlot
                            index={1}
                            className="text-zinc-800 text-4xl h-14  bg-[#dadbdb] border-zinc-500"
                          />
                          <InputOTPSlot
                            index={2}
                            className="text-zinc-800 text-4xl h-14  bg-[#dadbdb] border-zinc-500"
                          />
                        </InputOTPGroup>

                        <span className="text-slate-200 text-5xl">.</span>

                        <InputOTPGroup>
                          <InputOTPSlot
                            index={3}
                            className="text-zinc-800 text-4xl h-14  bg-[#dadbdb] border-zinc-500"
                          />
                          <InputOTPSlot
                            index={4}
                            className="text-zinc-800 text-4xl h-14  bg-[#dadbdb] border-zinc-500"
                          />
                          <InputOTPSlot
                            index={5}
                            className="text-zinc-800 text-4xl h-14  bg-[#dadbdb] border-zinc-500"
                          />
                        </InputOTPGroup>

                        <span className="text-slate-200 text-5xl">.</span>

                        <InputOTPGroup>
                          <InputOTPSlot
                            index={6}
                            className="text-zinc-800 text-4xl h-14  bg-[#dadbdb] border-zinc-500"
                          />
                          <InputOTPSlot
                            index={7}
                            className="text-zinc-800 text-4xl h-14  bg-[#dadbdb] border-zinc-500"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              className="max-w-md mt-12 py-10 px-20 text-2xl text-slate-100"
              type="submit"
            >
              Szukać
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
