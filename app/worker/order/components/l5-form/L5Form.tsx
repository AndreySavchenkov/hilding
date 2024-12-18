import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { orderItems } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckIcon } from "@radix-ui/react-icons";
import { L5FormSchema } from "@/types/schemas";
import { OrderFormField } from "@/components/ui/order-form-field";
import { CustomButton } from "@/components/ui/custom-button";

export const L5Form = () => {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const line = searchParams?.get("line");
  const area = searchParams?.get("area");
  const workerNumber = searchParams?.get("workerNumber");

  const form = useForm<z.infer<typeof L5FormSchema>>({
    resolver: zodResolver(L5FormSchema),
    defaultValues: {
      pallets: false,
      scotchTape: false,
      whiteBraid: false,
      separateSkarer: false,
      triangularCartonSkarer: false,
      paperLiningSkarer8090: false,
      paperLiningSkarer105: false,
      paperLiningSkarer120140: false,
      paperLiningSkarer160: false,
      separateSnarum: false,
      triangularCartonSnarum: false,
      paperLiningSnarum8090: false,
      paperLiningSnarum120140: false,
      paperLiningSnarum160: false,
      separateSkotterud: false,
      triangularCartonSkotterud: false,
      paperLiningSkotterud8090: false,
      paperLiningSkotterud120140: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof L5FormSchema>) => {
    setIsLoading(true);

    const orderOptions = {
      areaOptions: area,
      lineOptions: line,
      workerNumber: workerNumber,
      pallets: data.pallets,
      scotchTape: data.scotchTape,
      whiteBraid: data.whiteBraid,
      separateSkarer: data.separateSkarer,
      triangularCartonSkarer: data.triangularCartonSkarer,
      paperLiningSkarer8090: data.paperLiningSkarer8090,
      paperLiningSkarer105: data.paperLiningSkarer105,
      paperLiningSkarer120140: data.paperLiningSkarer120140,
      paperLiningSkarer160: data.paperLiningSkarer160,
      separateSnarum: data.separateSnarum,
      triangularCartonSnarum: data.triangularCartonSnarum,
      paperLiningSnarum8090: data.paperLiningSnarum8090,
      paperLiningSnarum120140: data.paperLiningSnarum120140,
      paperLiningSnarum160: data.paperLiningSnarum160,
      separateSkotterud: data.separateSkotterud,
      triangularCartonSkotterud: data.triangularCartonSkotterud,
      paperLiningSkotterud8090: data.paperLiningSkotterud8090,
      paperLiningSkotterud120140: data.paperLiningSkotterud120140,
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

          <Accordion type="single" collapsible className="space-y-2 mt-2">
            <AccordionItem
              value="item-1"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Skarer
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <OrderFormField
                  form={form}
                  name="separateSkarer"
                  item={orderItems.separateSkarer}
                />

                <OrderFormField
                  form={form}
                  name="triangularCartonSkarer"
                  item={orderItems.triangularCartonSkarer}
                />

                <OrderFormField
                  form={form}
                  name="paperLiningSkarer8090"
                  item={orderItems.paperLiningSkarer8090}
                />

                <OrderFormField
                  form={form}
                  name="paperLiningSkarer105"
                  item={orderItems.paperLiningSkarer105}
                />

                <OrderFormField
                  form={form}
                  name="paperLiningSkarer120140"
                  item={orderItems.paperLiningSkarer120140}
                />

                <OrderFormField
                  form={form}
                  name="paperLiningSkarer160"
                  item={orderItems.paperLiningSkarer160}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Snarum
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <OrderFormField
                  form={form}
                  name="separateSnarum"
                  item={orderItems.separateSnarum}
                />

                <OrderFormField
                  form={form}
                  name="triangularCartonSnarum"
                  item={orderItems.triangularCartonSnarum}
                />

                <OrderFormField
                  form={form}
                  name="paperLiningSnarum8090"
                  item={orderItems.paperLiningSnarum8090}
                />

                <OrderFormField
                  form={form}
                  name="paperLiningSnarum120140"
                  item={orderItems.paperLiningSnarum120140}
                />

                <OrderFormField
                  form={form}
                  name="paperLiningSnarum160"
                  item={orderItems.paperLiningSnarum160}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Skotterud
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <OrderFormField
                  form={form}
                  name="separateSkotterud"
                  item={orderItems.separateSkotterud}
                />

                <OrderFormField
                  form={form}
                  name="triangularCartonSkotterud"
                  item={orderItems.triangularCartonSkotterud}
                />

                <OrderFormField
                  form={form}
                  name="paperLiningSkotterud8090"
                  item={orderItems.paperLiningSkotterud8090}
                />

                <OrderFormField
                  form={form}
                  name="paperLiningSkotterud120140"
                  item={orderItems.paperLiningSkotterud120140}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <CustomButton isLoading={isLoading} text="Wysłać" />
        </form>
      </Form>
    </div>
  );
};
