"use client";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { orderItems } from "@/types";
import { useState } from "react";
import { L1L2FormSchema } from "@/types/schemas";
import { OrderFormField } from "@/components/ui/order-form-field";
import { CustomButton } from "@/components/ui/custom-button";
import { SuccessToast } from "@/components/ui/successToast";
import { useUser } from "@/hooks/useUser";

export default function L1L2Form() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const line = searchParams?.get("line");
  const area = searchParams?.get("area");

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
      createdById: user?.id,
      areaOptions: area,
      lineOptions: line,
      pallets: data.pallets,
      scotchTape: data.scotchTape,
      whiteBraid: data.whiteBraid,
      blackBelt: data.blackBelt,
      whiteBelt: data.whiteBelt,
      paperLining90: data.paperLining90,
      upPaperCommon: data.upPaperCommon,
    };

    try {
      const apiUrl = "/api/order/create-order";

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
        description: <SuccessToast text="Zamówienie wysłane!" />,
        className:
          "bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-white/10 backdrop-blur-sm shadow-xl",
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

          <CustomButton isLoading={isLoading} text="Wysłać" />
        </form>
      </Form>
    </div>
  );
}
