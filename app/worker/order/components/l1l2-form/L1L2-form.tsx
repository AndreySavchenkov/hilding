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
import okIcon from "../../../../../public/OK.png";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

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
        title: "Zamówienie wysłane!",
        description: (
          <Image
            src={okIcon}
            alt="ok"
            width={36}
            height={36}
            className="fixed top-8 right-6"
          />
        ),
        variant: "default",
        className: "bg-gray-500 text-gray-300 border-none",
      });

      router.push(`/`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

    console.log(data);
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-full px-4"
        >
          <FormField
            control={form.control}
            name="pallets"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500 py-5 ">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={orderItems.pallets.icon}
                    alt={orderItems.pallets.PL}
                    width={36}
                    height={36}
                  />
                  {orderItems.pallets.PL}
                </FormLabel>
                <FormControl className="m-0">
                  <Checkbox
                    className="w-9 h-9 !m-0"
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
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500 py-5">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={orderItems.scotchTape.icon}
                    alt={orderItems.scotchTape.PL}
                    width={36}
                    height={36}
                  />
                  {orderItems.scotchTape.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.scotchTape.index}
                    </span>
                    <Checkbox
                      className="w-9 h-9"
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
              <FormItem className="flex gap-4 items-center justify-between border-b border-gray-500 py-5">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={orderItems.whiteBraid.icon}
                    alt={orderItems.whiteBraid.PL}
                    width={36}
                    height={36}
                  />
                  {orderItems.whiteBraid.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.whiteBraid.index}
                    </span>
                    <Checkbox
                      className="w-9 h-9"
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
              <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={orderItems.blackBelt.icon}
                    alt={orderItems.blackBelt.PL}
                    width={36}
                    height={36}
                  />
                  {orderItems.blackBelt.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.blackBelt.index}
                    </span>
                    <Checkbox
                      className="w-9 h-9"
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
              <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={orderItems.whiteBelt.icon}
                    alt={orderItems.whiteBelt.PL}
                    width={36}
                    height={36}
                  />
                  {orderItems.whiteBelt.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.whiteBelt.index}
                    </span>
                    <Checkbox
                      className="w-9 h-9"
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
              <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={orderItems.paperLining90.icon}
                    alt={orderItems.paperLining90.PL}
                    width={36}
                    height={36}
                  />
                  {orderItems.paperLining90.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.paperLining90.index}
                    </span>
                    <Checkbox
                      className="w-9 h-9"
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
              <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={orderItems.upPaperCommon.icon}
                    alt={orderItems.upPaperCommon.PL}
                    width={36}
                    height={36}
                  />
                  {orderItems.upPaperCommon.PL}
                </FormLabel>
                <FormControl>
                  <div className="flex items-center gap-4 !m-0">
                    <span className="text-gray-400 text-sm">
                      {orderItems.upPaperCommon.index}
                    </span>
                    <Checkbox
                      className="w-9 h-9"
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
            <Button disabled className="max-w-md mt-6 mb-6 py-10 text-xl">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="max-w-md mt-6 mb-6 py-10 text-xl">
              Wysłać
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
