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
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import palletsIcon from "../../../../../public/pallets.png";
import scotchTapeIcon from "../../../../../public/scotchTape.png";
import whiteTapeIcon from "../../../../../public/whiteTape.png";
import blackBeltIcon from "../../../../../public/blackBelt.png";
import whiteBeltIcon from "../../../../../public/whiteBelt.png";
import paperLining90 from "../../../../../public/paperLining90.png";
import paperLining101 from "../../../../../public/paperLining101.png";
import cartonBox from "../../../../../public/cartonBox.png";
import downPaper from "../../../../../public/downPaper.png";
import upPaper from "../../../../../public/upPaper.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
});

export default function Order() {
  const searchParams = useSearchParams();

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
        title: "Заказ сделан успешно!",
        description: `${data?.pallets && "Палеты"} ${
          data?.scotchTape && "Белый стрейч"
        } ${data?.scotchTape && "Скотч"}`,
      });
    } catch (error) {
      console.log(error);
    }

    console.log(data);
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full px-4"
        >
          <FormField
            control={form.control}
            name="pallets"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b pb-4 ">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={palletsIcon}
                    alt="wood pallets"
                    width={36}
                    height={36}
                  />
                  Palety EURO
                </FormLabel>
                <FormControl>
                  <Checkbox
                    className="w-9 h-9"
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
              <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={scotchTapeIcon}
                    alt="scotch tape"
                    width={36}
                    height={36}
                  />
                  Taśma Klejąca
                  <span className="text-gray-400 text-sm">GM16004</span>
                </FormLabel>
                <FormControl>
                  <Checkbox
                    className="w-9 h-9"
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
            name="whiteBraid"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                  <Image
                    src={whiteTapeIcon}
                    alt="white tape"
                    width={36}
                    height={36}
                  />
                  Stretcz biały
                  <span className="text-gray-400 text-sm">GM15015</span>
                </FormLabel>
                <FormControl>
                  <Checkbox
                    className="w-9 h-9"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-slate-100 text-md">
                Uchwyt
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="blackBelt"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={blackBeltIcon}
                          alt="black belt"
                          width={36}
                          height={36}
                        />
                        Uchwyt parciany
                        <span className="text-gray-400 text-sm">G100400</span>
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
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
                  name="whiteBelt"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={whiteBeltIcon}
                          alt="white belt"
                          width={36}
                          height={36}
                        />
                        Uchwyt klejony
                        <span className="text-gray-400 text-sm">G100430</span>
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-slate-100 text-md">
                Paleta Papierowa
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="paperLining90"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={paperLining90}
                          alt="paper lining 90"
                          width={36}
                          height={36}
                        />
                        Valevag \ Vesteroy
                        <span className="text-gray-400 text-sm">GB710090</span>
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
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
                  name="paperLining101"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={paperLining101}
                          alt="paper lining 101"
                          width={36}
                          height={36}
                        />
                        Vagstranda
                        <span className="text-gray-400 text-sm">GB71101</span>
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Картонная вкладка</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="downPaperXFirm"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={downPaper}
                          alt="down paper"
                          width={36}
                          height={36}
                        />
                        X-Firm
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
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
                  name="downPaperVagstranda"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={downPaper}
                          alt="down paper"
                          width={36}
                          height={36}
                        />
                        Vagstranda
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Чапка на гуру</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="upPaperCommon"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={upPaper}
                          alt="up paper"
                          width={36}
                          height={36}
                        />
                        Common
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
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
                  name="upPaperVagstranda"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={upPaper}
                          alt="up paper"
                          width={36}
                          height={36}
                        />
                        Vagstranda
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Картоны для Вакстранды</AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="cartonBox80"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={cartonBox}
                          alt="paper lining 101"
                          width={36}
                          height={36}
                        />
                        80
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
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
                  name="cartonBox90"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={cartonBox}
                          alt="paper lining 101"
                          width={36}
                          height={36}
                        />
                        90
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
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
                  name="cartonBox120"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={cartonBox}
                          alt="paper lining 101"
                          width={36}
                          height={36}
                        />
                        120
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
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
                  name="cartonBox140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={cartonBox}
                          alt="paper lining 101"
                          width={36}
                          height={36}
                        />
                        140
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
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
                  name="cartonBox160"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={cartonBox}
                          alt="paper lining 101"
                          width={36}
                          height={36}
                        />
                        160
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
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
                  name="cartonBox180"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b pb-4">
                      <FormLabel className="flex gap-4 items-center">
                        <Image
                          src={cartonBox}
                          alt="paper lining 101"
                          width={36}
                          height={36}
                        />
                        180
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          className="w-9 h-9"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button type="submit" className="max-w-md mt-6 py-10">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
}
