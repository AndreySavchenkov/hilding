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
    }
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
    backgroundColor: state.isFocused ? "rgba(59, 130, 246, 0.5)" : "transparent",
    color: "#fff",
    padding: "0.75rem 1rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(59, 130, 246, 0.3)",
    }
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
    <div className="max-w-screen-lg mx-auto py-10 h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full px-4"
        >
          <div className="flex flex-col gap-5 w-full">
            <FormField
              control={form.control}
              name="line"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-slate-100 text-2xl">
                    Linia produkcyjna:
                  </FormLabel>
                  <FormControl onTouchStart={handleTouchStart}>
                    <Select
                      {...field}
                      styles={customStyles}
                      options={lineOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-slate-100 text-2xl">
                    Stanawisko:
                  </FormLabel>
                  <FormControl onTouchStart={handleTouchStart}>
                    <Select
                      {...field}
                      styles={customStyles}
                      options={areaOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workerNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-slate-100 text-2xl">
                    Numer pracownika:
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="text-slate-200 text-4xl p-8 bg-[#1f2937]"
                        />
                        <InputOTPSlot
                          index={1}
                          className="text-slate-200 text-4xl p-8 bg-[#1f2937]"
                        />
                        <InputOTPSlot
                          index={2}
                          className="text-slate-200 text-4xl p-8 bg-[#1f2937]"
                        />
                        <InputOTPSlot
                          index={3}
                          className="text-slate-200 text-4xl p-8 bg-[#1f2937]"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {isLoading ? (
            <Button
              disabled
              className="max-w-md mt-12 py-10 text-2xl text-slate-100"
            >
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button
              className="max-w-md mt-12 py-10 text-2xl text-slate-100"
              type="submit"
            >
              Dalej
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
