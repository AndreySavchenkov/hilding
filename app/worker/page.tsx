"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { areaOptions, lineOptions } from "@/types";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

type FormType = {
  line?: { value: string; label: string } | null;
  area?: { value: string; label: string } | null;
  workerNumber?: string;
};

const formSchema: ZodType<FormType> = z.object({
  workerNumber: z
    .string({
      required_error: "Worker Number is required.",
    })
    .min(4, {
      message: "Worker Number must be at 4 characters.",
    }),
  line: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      required_error: "Line is required.",
    }
  ),
  area: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    {
      required_error: "Area is required.",
    }
  ),
});

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "0.75rem",
    color: "#fff",
    padding: "0.5rem",
    fontSize: "1.125rem",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      borderColor: "rgba(255, 255, 255, 0.3)",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "rgba(31, 41, 55, 0.95)",
    backdropFilter: "blur(8px)",
    borderRadius: "0.75rem",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    fontSize: "1.125rem",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#fff",
    fontSize: "1.125rem",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(59, 130, 246, 0.5)"
      : "transparent",
    color: "#fff",
    padding: "0.75rem 1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(59, 130, 246, 0.3)",
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: "rgba(255, 255, 255, 0.5)",
  }),
};

export default function Worker() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormType>({
    defaultValues: {
      line: { value: "L10", label: "L10" },
      area: { value: "Finish", label: "Pakowanie" },
    },
    resolver: zodResolver(formSchema),
  });

  const handleTouchStart = (e: any) => {
    e.preventDefault(); // предотвращаем вызов клавиатуры
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<FormType> = (data) => {
    setIsLoading(true);

    const query = {
      line: data.line?.value || "",
      area: data.area?.value || "",
      workerNumber: data.workerNumber || "",
    };

    const queryString = new URLSearchParams(query).toString();

    router.push(`/worker/order?${queryString}`);
  };

  return (
    <div className="h-[calc(100vh-83px)]  p-4 overflow-y-auto">
      <div className="max-w-screen-lg mx-auto py-4 md:py-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <div className="flex flex-col space-y-6">
              <FormField
                control={form.control}
                name="line"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">
                      Linia produkcyjna:
                    </FormLabel>
                    <FormControl onTouchStart={handleTouchStart}>
                      <Select
                        {...field}
                        styles={customStyles}
                        options={lineOptions}
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">
                      Stanawisko:
                    </FormLabel>
                    <FormControl onTouchStart={handleTouchStart}>
                      <Select
                        {...field}
                        styles={customStyles}
                        options={areaOptions}
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workerNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">
                      Numer pracownika:
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        className="flex justify-center mt-2"
                      >
                        <InputOTPGroup className="gap-2 md:gap-4">
                          {[0, 1, 2, 3].map((index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="w-14 h-14 md:w-16 md:h-16 text-2xl md:text-4xl text-white bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage className="text-red-400 mt-2" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              disabled={isLoading}
              className="w-full md:max-w-md mx-auto mt-8 py-6 md:py-8 text-xl md:text-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold tracking-wide transition-all duration-300 rounded-xl shadow-lg hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <ReloadIcon className="h-6 w-6 animate-spin" />
                  <span>Ładowanie...</span>
                </div>
              ) : (
                "Dalej"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
