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
import okIcon from "../../../../../public/OK.png";

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

export default function Order() {
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

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline">
                Uchwyt
              </AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-0">
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline">
                Paleta Papierowa
              </AccordionTrigger>
              <AccordionContent>
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
                  name="paperLining101"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLining101.icon}
                          alt={orderItems.paperLining101.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLining101.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLining101.index}
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-0">
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline">
                Przekładka papierowa (do palety)
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="downPaperXFirm"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.downPaperXFirm.icon}
                          alt={orderItems.downPaperXFirm.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.downPaperXFirm.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.downPaperXFirm.index}
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
                  name="downPaperVagstranda"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.downPaperVagstranda.icon}
                          alt={orderItems.downPaperVagstranda.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.downPaperVagstranda.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.downPaperVagstranda.index}
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-0">
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline">
                Pokrywa papierowa (góra){" "}
              </AccordionTrigger>
              <AccordionContent>
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

                <FormField
                  control={form.control}
                  name="upPaperVagstranda"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.upPaperVagstranda.icon}
                          alt={orderItems.upPaperVagstranda.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.upPaperVagstranda.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.upPaperVagstranda.index}
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-0">
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline">
                Carton Box (Vagstranda)
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="cartonBox80"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.cartonBox80.icon}
                          alt={orderItems.cartonBox80.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.cartonBox80.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox80.index}
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
                  name="cartonBox90"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.cartonBox90.icon}
                          alt={orderItems.cartonBox90.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.cartonBox90.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox90.index}
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
                  name="cartonBox120"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.cartonBox120.icon}
                          alt={orderItems.cartonBox120.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.cartonBox120.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox120.index}
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
                  name="cartonBox140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.cartonBox140.icon}
                          alt={orderItems.cartonBox140.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.cartonBox140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox140.index}
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
                  name="cartonBox160"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.cartonBox160.icon}
                          alt={orderItems.cartonBox160.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.cartonBox160.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox160.index}
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
                  name="cartonBox180"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.cartonBox180.icon}
                          alt={orderItems.cartonBox180.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.cartonBox180.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.cartonBox180.index}
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
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-0">
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline">
                Strecz / Nylon do Rolpaka
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="stretch"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.stretch.icon}
                          alt={orderItems.stretch.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.stretch.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.stretch.index}
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
                  name="nylon8090"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.nylon8090.icon}
                          alt={orderItems.nylon8090.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.nylon8090.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.nylon8090.index}
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
                  name="nylon120140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.nylon120140.icon}
                          alt={orderItems.nylon120140.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.nylon120140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.nylon120140.index}
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
                  name="nylon160"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.nylon160.icon}
                          alt={orderItems.nylon160.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.nylon160.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.nylon160.index}
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
                  name="nylon180"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.nylon180.icon}
                          alt={orderItems.nylon180.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.nylon180.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.nylon180.index}
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" className="max-w-md mt-6 mb-6 py-10 text-xl">
            Wysłać
          </Button>
        </form>
      </Form>
    </div>
  );
}
