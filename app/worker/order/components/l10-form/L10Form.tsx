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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  paperLining101: z.boolean().default(false).optional(),
  cartonBox80: z.boolean().default(false).optional(),
  cartonBox90: z.boolean().default(false).optional(),
  cartonBox120: z.boolean().default(false).optional(),
  cartonBox140: z.boolean().default(false).optional(),
  cartonBox160: z.boolean().default(false).optional(),
  cartonBox180: z.boolean().default(false).optional(),
  downPaperXFirm: z.boolean().default(false).optional(),
  downPaperVagstranda: z.boolean().default(false).optional(),
  upPaperCommon: z.boolean().default(false).optional(),
  upPaperVagstranda: z.boolean().default(false).optional(),
  stretch: z.boolean().default(false).optional(),
  nylon8090: z.boolean().default(false).optional(),
  nylon120140: z.boolean().default(false).optional(),
  nylon160: z.boolean().default(false).optional(),
  nylon180: z.boolean().default(false).optional(),
});

export default function L10Form() {
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

    console.log(data);
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

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem
              value="item-1"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Uchwyt
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
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
                  name="paperLining101"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.paperLining101.icon}
                          alt={orderItems.paperLining101.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.paperLining101.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLining101.index}
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

            <AccordionItem
              value="item-3"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Przekładka papierowa (do palety)
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <FormField
                  control={form.control}
                  name="downPaperXFirm"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.downPaperXFirm.icon}
                          alt={orderItems.downPaperXFirm.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.downPaperXFirm.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.downPaperXFirm.index}
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
                  name="downPaperVagstranda"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.downPaperVagstranda.icon}
                          alt={orderItems.downPaperVagstranda.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.downPaperVagstranda.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.downPaperVagstranda.index}
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

            <AccordionItem
              value="item-4"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Pokrywa papierowa (góra){" "}
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
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

                <FormField
                  control={form.control}
                  name="upPaperVagstranda"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.upPaperVagstranda.icon}
                          alt={orderItems.upPaperVagstranda.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.upPaperVagstranda.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.upPaperVagstranda.index}
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

            <AccordionItem
              value="item-5"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Carton Box (Vagstranda)
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <FormField
                  control={form.control}
                  name="cartonBox80"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.cartonBox80.icon}
                          alt={orderItems.cartonBox80.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.cartonBox80.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox80.index}
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
                  name="cartonBox90"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.cartonBox90.icon}
                          alt={orderItems.cartonBox90.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.cartonBox90.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox90.index}
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
                  name="cartonBox120"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.cartonBox120.icon}
                          alt={orderItems.cartonBox120.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.cartonBox120.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox120.index}
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
                  name="cartonBox140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.cartonBox140.icon}
                          alt={orderItems.cartonBox140.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.cartonBox140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox140.index}
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
                  name="cartonBox160"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.cartonBox160.icon}
                          alt={orderItems.cartonBox160.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.cartonBox160.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox160.index}
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
                  name="cartonBox180"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.cartonBox180.icon}
                          alt={orderItems.cartonBox180.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.cartonBox180.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox180.index}
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

            <AccordionItem
              value="item-6"
              className="border-0 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors rounded-lg">
                Strecz / Nylon do Rolpaka
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pt-2">
                <FormField
                  control={form.control}
                  name="stretch"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.stretch.icon}
                          alt={orderItems.stretch.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.stretch.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.stretch.index}
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
                  name="nylon8090"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.nylon8090.icon}
                          alt={orderItems.nylon8090.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.nylon8090.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.nylon8090.index}
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
                  name="nylon120140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.nylon120140.icon}
                          alt={orderItems.nylon120140.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.nylon120140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.nylon120140.index}
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
                  name="nylon160"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.nylon160.icon}
                          alt={orderItems.nylon160.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.nylon160.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.nylon160.index}
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
                  name="nylon180"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 hover:bg-gray-800/20 transition-colors rounded-lg px-2">
                      <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1">
                        <Image
                          src={orderItems.nylon180.icon}
                          alt={orderItems.nylon180.PL}
                          width={32}
                          height={32}
                          className="rounded-lg shadow-md"
                        />
                        {orderItems.nylon180.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.nylon180.index}
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
