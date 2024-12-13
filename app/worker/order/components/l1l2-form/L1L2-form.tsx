"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { orderItems } from "@/types";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  pallets: z.boolean().default(false).optional(),
  scotchTape: z.boolean().default(false).optional(),
  whiteBraid: z.boolean().default(false).optional(),
  blackBelt: z.boolean().default(false).optional(),
  whiteBelt: z.boolean().default(false).optional(),
  paperLining90: z.boolean().default(false).optional(),
  upPaperCommon: z.boolean().default(false).optional(),
});

export default function L1L2Form() {
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
      blackBelt: false,
      whiteBelt: false,
      paperLining90: false,
      upPaperCommon: false,
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
        className: "bg-gradient-to-r from-gray-900 to-gray-800 border-l-4 border-green-500 shadow-xl",
      }),

      router.push(`/`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-8 pb-8 px-2 md:mt-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full px-2 md:px-4 bg-gradient-to-b from-gray-900/50 to-gray-800/30 rounded-xl shadow-xl"
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

          <FormField
            control={form.control}
            name="blackBelt"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                  <Image
                    src={orderItems.blackBelt.icon}
                    alt={orderItems.blackBelt.PL}
                    width={32}
                    height={32}
                    className="rounded-lg shadow-md"
                  />
                  {orderItems.blackBelt.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.blackBelt.index}
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
            name="whiteBelt"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                  <Image
                    src={orderItems.whiteBelt.icon}
                    alt={orderItems.whiteBelt.PL}
                    width={32}
                    height={32}
                    className="rounded-lg shadow-md"
                  />
                  {orderItems.whiteBelt.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.whiteBelt.index}
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
            name="paperLining90"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                  <Image
                    src={orderItems.paperLining90.icon}
                    alt={orderItems.paperLining90.PL}
                    width={32}
                    height={32}
                    className="rounded-lg shadow-md"
                  />
                  {orderItems.paperLining90.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.paperLining90.index}
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
            name="upPaperCommon"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                  <Image
                    src={orderItems.upPaperCommon.icon}
                    alt={orderItems.upPaperCommon.PL}
                    width={32}
                    height={32}
                    className="rounded-lg shadow-md"
                  />
                  {orderItems.upPaperCommon.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.upPaperCommon.index}
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
              className="max-w-md mx-auto mt-6 mb-6 py-8 text-lg w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] rounded-xl shadow-lg"
            >
              Wysłać
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
