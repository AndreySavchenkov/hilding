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

export default function Worker() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormType> = (data) => {
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
          className="flex flex-col justify-between h-full px-4"
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
                  <FormControl>
                    <Select {...field} options={lineOptions} />
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
                  <FormControl>
                    <Select {...field} options={areaOptions} />
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
                          className="text-slate-100 text-4xl"
                        />
                        <InputOTPSlot
                          index={1}
                          className="text-slate-100 text-4xl"
                        />
                        <InputOTPSlot
                          index={2}
                          className="text-slate-100 text-4xl"
                        />
                        <InputOTPSlot
                          index={3}
                          className="text-slate-100 text-4xl"
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
            className="max-w-md mt-12 py-10 text-2xl text-slate-100"
            type="submit"
          >
            Dalej
          </Button>
        </form>
      </Form>
    </div>
  );
}
