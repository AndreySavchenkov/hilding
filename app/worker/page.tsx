"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

const lineOptions = [
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L10", label: "L10" },
];

const areaOptions = [
  { value: "Start", label: "Start" },
  { value: "Middle", label: "Middle" },
  { value: "Finish", label: "Finish" },
];

export default function Worker() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema), // Apply the zodResolver
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormType> = (data) => {
    //TODO: Move this code to the Order Page

    // const orderOptions = {
    //   areaOptions: data.area?.value,
    //   lineOptions: data.line?.value,
    //   workerNumber: data.workerNumber,
    // };

    // try {
    //   const apiUrl = "/api/order/create-order-options";

    //   const requestData = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ orderOptions }),
    //   };

    //   const response = await fetch(apiUrl, requestData);

    //   if (!response.ok) {
    //     throw new Error(
    //       `Failed to post worker order option: ${response.status} - ${response.statusText}`
    //     );
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    console.log(data);

    const query = {
      line: data.line?.value,
      area: data.area?.value,
      workerNumber: data.workerNumber,
    };

    const queryString = new URLSearchParams(query).toString();

    router.push(`/worker/order?${queryString}`);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="line"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Выберите линию:</FormLabel>
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
              <FormItem>
                <FormLabel>Выберите рабочий участок:</FormLabel>
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
              <FormItem>
                <FormLabel>Введите свой ID номер:</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Send</Button>
        </form>
      </Form>
    </div>
  );
}
