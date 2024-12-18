"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { orderItems } from "@/types";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "@radix-ui/react-icons";
import { L1L2FormSchema } from "@/types/schemas";
import { OrderFormField } from "@/components/ui/order-form-field";

export default function L1L2Form() {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const line = searchParams?.get("line");
  const area = searchParams?.get("area");
  const workerNumber = searchParams?.get("workerNumber");

  const form = useForm<z.infer<typeof L1L2FormSchema>>({
    resolver: zodResolver(L1L2FormSchema),
    defaultValues: {
      pallets: false,
      scotchTape: false,
      whiteBraid: false,
      blackBelt: false,
      whiteBelt: false,
      paperLining90: false,
      upPaperCommon: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof L1L2FormSchema>) => {
    setIsLoading(true);

    const orderOptions = {
      areaOptions: area,
      lineOptions: line,
      workerNumber: workerNumber,
      pallets: data.pallets,
      scotchTape: data.scotchTape,
      whiteBraid: data.whiteBraid,
      blackBelt: data.blackBelt,
      whiteBelt: data.whiteBelt,
      paperLining90: data.paperLining90,
      upPaperCommon: data.upPaperCommon,
    };

    try {
      const apiUrl = "/api/order/create-order-options";

      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderOptions }),
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(
          `Failed to post worker order option: ${response.status} - ${response.statusText}`
        );
      }

      toast({
        duration: 3000,
        description: (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <CheckIcon className="h-5 w-5 text-white" />
            </div>
            <span className="font-medium text-white">Zamówienie wysłane!</span>
          </div>
        ),
        className:
          "bg-gradient-to-r from-gray-900 to-gray-800 border-l-4 border-green-500 shadow-xl",
      }),
        router.push(`/`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-4 my-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm"
        >
          <OrderFormField
            form={form}
            name="pallets"
            item={orderItems.pallets}
          />

          <OrderFormField
            form={form}
            name="scotchTape"
            item={orderItems.scotchTape}
          />

          <OrderFormField
            form={form}
            name="whiteBraid"
            item={orderItems.whiteBraid}
          />

          <OrderFormField
            form={form}
            name="blackBelt"
            item={orderItems.blackBelt}
          />

          <OrderFormField
            form={form}
            name="whiteBelt"
            item={orderItems.whiteBelt}
          />

          <OrderFormField
            form={form}
            name="paperLining90"
            item={orderItems.paperLining90}
          />

          <OrderFormField
            form={form}
            name="upPaperCommon"
            item={orderItems.upPaperCommon}
          />

          {isLoading ? (
            <Button
              disabled
              className="max-w-md mx-auto mt-6 mb-6 py-8 text-lg w-full bg-gray-700 hover:bg-gray-600 transition-colors rounded-xl shadow-lg"
            >
              <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="max-w-md w-full mt-6 mb-6 py-8 text-3xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-bold tracking-wide rounded-xl"
            >
              Wysłać
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
