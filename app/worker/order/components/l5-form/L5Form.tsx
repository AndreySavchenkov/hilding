import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { orderItems } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  pallets: z.boolean().default(false).optional(),
  scotchTape: z.boolean().default(false).optional(),
  whiteBraid: z.boolean().default(false).optional(),
  separateSkarer: z.boolean().default(false).optional(),
  triangularCartonSkarer: z.boolean().default(false).optional(),
  paperLiningSkarer8090: z.boolean().default(false).optional(),
  paperLiningSkarer105: z.boolean().default(false).optional(),
  paperLiningSkarer120140: z.boolean().default(false).optional(),
  paperLiningSkarer160: z.boolean().default(false).optional(),
  separateSnarum: z.boolean().default(false).optional(),
  triangularCartonSnarum: z.boolean().default(false).optional(),
  paperLiningSnarum8090: z.boolean().default(false).optional(),
  paperLiningSnarum120140: z.boolean().default(false).optional(),
  paperLiningSnarum160: z.boolean().default(false).optional(),
  separateSkotterud: z.boolean().default(false).optional(),
  triangularCartonSkotterud: z.boolean().default(false).optional(),
  paperLiningSkotterud8090: z.boolean().default(false).optional(),
  paperLiningSkotterud120140: z.boolean().default(false).optional(),
});

export const L5Form = () => {
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const line = searchParams?.get("line");
  const area = searchParams?.get("area");
  const workerNumber = searchParams?.get("workerNumber");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
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
          <FormField
            control={form.control}
            name="pallets"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                  <Image
                    src={orderItems.pallets.icon}
                    alt={orderItems.pallets.PL}
                    width={32}
                    height={32}
                    className="rounded-lg shadow-md"
                  />
                  {orderItems.pallets.PL}
                </FormLabel>
                <FormControl className="m-0">
                  <Checkbox
                    className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="scotchTape"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                  <Image
                    src={orderItems.scotchTape.icon}
                    alt={orderItems.scotchTape.PL}
                    width={32}
                    height={32}
                    className="rounded-lg shadow-md"
                  />
                  {orderItems.scotchTape.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.scotchTape.index}
                    </span>
                    <Checkbox
                      className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whiteBraid"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                  <Image
                    src={orderItems.whiteBraid.icon}
                    alt={orderItems.whiteBraid.PL}
                    width={32}
                    height={32}
                    className="rounded-lg shadow-md"
                  />
                  {orderItems.whiteBraid.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.whiteBraid.index}
                    </span>
                    <Checkbox
                      className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem
              value="item-1"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Skarer
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <FormField
                  control={form.control}
                  name="separateSkarer"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.separateSkarer.icon}
                          alt={orderItems.separateSkarer.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.separateSkarer.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.separateSkarer.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="triangularCartonSkarer"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.triangularCartonSkarer.icon}
                          alt={orderItems.triangularCartonSkarer.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.triangularCartonSkarer.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.triangularCartonSkarer.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paperLiningSkarer8090"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLiningSkarer8090.icon}
                          alt={orderItems.paperLiningSkarer8090.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLiningSkarer8090.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkarer8090.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paperLiningSkarer105"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLiningSkarer105.icon}
                          alt={orderItems.paperLiningSkarer105.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLiningSkarer105.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkarer105.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paperLiningSkarer120140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLiningSkarer120140.icon}
                          alt={orderItems.paperLiningSkarer120140.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLiningSkarer120140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkarer120140.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paperLiningSkarer160"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLiningSkarer160.icon}
                          alt={orderItems.paperLiningSkarer160.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLiningSkarer160.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkarer160.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem
              value="item-1"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Snarum
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <FormField
                  control={form.control}
                  name="separateSnarum"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.separateSnarum.icon}
                          alt={orderItems.separateSnarum.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.separateSnarum.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.separateSnarum.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="triangularCartonSnarum"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.triangularCartonSnarum.icon}
                          alt={orderItems.triangularCartonSnarum.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.triangularCartonSnarum.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.triangularCartonSnarum.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paperLiningSnarum8090"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLiningSnarum8090.icon}
                          alt={orderItems.paperLiningSnarum8090.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLiningSnarum8090.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSnarum8090.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paperLiningSnarum120140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLiningSnarum120140.icon}
                          alt={orderItems.paperLiningSnarum120140.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLiningSnarum120140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSnarum120140.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paperLiningSnarum160"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLiningSnarum160.icon}
                          alt={orderItems.paperLiningSnarum160.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLiningSnarum160.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSnarum160.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem
              value="item-1"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Skotterud
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <FormField
                  control={form.control}
                  name="separateSkotterud"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.separateSkotterud.icon}
                          alt={orderItems.separateSkotterud.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.separateSkotterud.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.separateSkotterud.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="triangularCartonSkotterud"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.triangularCartonSkotterud.icon}
                          alt={orderItems.triangularCartonSkotterud.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.triangularCartonSkotterud.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.triangularCartonSkotterud.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paperLiningSkotterud8090"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLiningSkotterud8090.icon}
                          alt={orderItems.paperLiningSkotterud8090.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLiningSkotterud8090.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkotterud8090.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paperLiningSkotterud120140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLiningSkotterud120140.icon}
                          alt={orderItems.paperLiningSkotterud120140.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLiningSkotterud120140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkotterud120140.index}
                          </span>
                          <Checkbox
                            className="w-7 h-7 md:w-9 md:h-9 
  border-2 border-blue-400/50 
  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
  transition-all hover:scale-105 hover:border-blue-400
  focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

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
};
