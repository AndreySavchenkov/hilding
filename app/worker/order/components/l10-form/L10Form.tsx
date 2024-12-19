"use client";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { orderItems } from "@/types";
import { useState } from "react";
import { L10FormSchema } from "@/types/schemas";
import { OrderFormField } from "@/components/ui/order-form-field";
import { CustomButton } from "@/components/ui/custom-button";
import { SuccessToast } from "@/components/ui/successToast";
import { useUser } from "@/hooks/useUser";

export default function L10Form() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const line = searchParams?.get("line");
  const area = searchParams?.get("area");
  const workerNumber = searchParams?.get("workerNumber");

  const form = useForm<z.infer<typeof L10FormSchema>>({
    resolver: zodResolver(L10FormSchema),
    defaultValues: {
      pallets: false,
      scotchTape: false,
      whiteBraid: false,
      blackBelt: false,
      whiteBelt: false,
      paperLining90: false,
      paperLining101: false,
      cartonBox80: false,
      cartonBox90: false,
      cartonBox120: false,
      cartonBox140: false,
      cartonBox160: false,
      cartonBox180: false,
      downPaperXFirm: false,
      downPaperVagstranda: false,
      upPaperCommon: false,
      upPaperVagstranda: false,
      stretch: false,
      nylon8090: false,
      nylon120140: false,
      nylon160: false,
      nylon180: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof L10FormSchema>) => {
    setIsLoading(true);

    const orderOptions = {
      createdById: user?.id,
      areaOptions: area,
      lineOptions: line,
      workerNumber: workerNumber,
      pallets: data.pallets,
      scotchTape: data.scotchTape,
      whiteBraid: data.whiteBraid,
      blackBelt: data.blackBelt,
      whiteBelt: data.whiteBelt,
      paperLining90: data.paperLining90,
      paperLining101: data.paperLining101,
      cartonBox80: data.cartonBox80,
      cartonBox90: data.cartonBox90,
      cartonBox120: data.cartonBox120,
      cartonBox140: data.cartonBox140,
      cartonBox160: data.cartonBox160,
      cartonBox180: data.cartonBox180,
      downPaperXFirm: data.downPaperXFirm,
      downPaperVagstranda: data.downPaperVagstranda,
      upPaperCommon: data.upPaperCommon,
      upPaperVagstranda: data.upPaperVagstranda,
      stretch: data.stretch,
      nylon8090: data.nylon8090,
      nylon120140: data.nylon120140,
      nylon160: data.nylon160,
      nylon180: data.nylon180,
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

    console.log(data);
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

          <Accordion type="single" collapsible className="space-y-2 mt-2">
            <AccordionItem
              value="item-1"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Uchwyt
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Paleta Papierowa
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <OrderFormField
                  form={form}
                  name="paperLining90"
                  item={orderItems.paperLining90}
                />

                <OrderFormField
                  form={form}
                  name="paperLining101"
                  item={orderItems.paperLining101}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Przekładka papierowa (do palety)
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <OrderFormField
                  form={form}
                  name="downPaperXFirm"
                  item={orderItems.downPaperXFirm}
                />

                <OrderFormField
                  form={form}
                  name="downPaperVagstranda"
                  item={orderItems.downPaperVagstranda}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Pokrywa papierowa (góra){" "}
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <OrderFormField
                  form={form}
                  name="upPaperCommon"
                  item={orderItems.upPaperCommon}
                />

                <OrderFormField
                  form={form}
                  name="upPaperVagstranda"
                  item={orderItems.upPaperVagstranda}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Carton Box (Vagstranda)
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <OrderFormField
                  form={form}
                  name="cartonBox80"
                  item={orderItems.cartonBox80}
                />

                <OrderFormField
                  form={form}
                  name="cartonBox90"
                  item={orderItems.cartonBox90}
                />

                <OrderFormField
                  form={form}
                  name="cartonBox120"
                  item={orderItems.cartonBox120}
                />

                <OrderFormField
                  form={form}
                  name="cartonBox140"
                  item={orderItems.cartonBox140}
                />

                <OrderFormField
                  form={form}
                  name="cartonBox160"
                  item={orderItems.cartonBox160}
                />

                <OrderFormField
                  form={form}
                  name="cartonBox180"
                  item={orderItems.cartonBox180}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Strecz / Nylon do Rolpaka
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <OrderFormField
                  form={form}
                  name="stretch"
                  item={orderItems.stretch}
                />

                <OrderFormField
                  form={form}
                  name="nylon8090"
                  item={orderItems.nylon8090}
                />

                <OrderFormField
                  form={form}
                  name="nylon120140"
                  item={orderItems.nylon120140}
                />

                <OrderFormField
                  form={form}
                  name="nylon160"
                  item={orderItems.nylon160}
                />

                <OrderFormField
                  form={form}
                  name="nylon180"
                  item={orderItems.nylon180}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <CustomButton isLoading={isLoading} text="Wysłać" />
        </form>
      </Form>
    </div>
  );
}
