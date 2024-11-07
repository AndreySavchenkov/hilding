import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import okIcon from "../../../../../public/OK.png";
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
                Skarer
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="separateSkarer"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.separateSkarer.icon}
                          alt={orderItems.separateSkarer.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.separateSkarer.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.separateSkarer.index}
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
                  name="triangularCartonSkarer"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.triangularCartonSkarer.icon}
                          alt={orderItems.triangularCartonSkarer.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.triangularCartonSkarer.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.triangularCartonSkarer.index}
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
                  name="paperLiningSkarer8090"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLiningSkarer8090.icon}
                          alt={orderItems.paperLiningSkarer8090.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLiningSkarer8090.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkarer8090.index}
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
                  name="paperLiningSkarer105"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLiningSkarer105.icon}
                          alt={orderItems.paperLiningSkarer105.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLiningSkarer105.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkarer105.index}
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
                  name="paperLiningSkarer120140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLiningSkarer120140.icon}
                          alt={orderItems.paperLiningSkarer120140.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLiningSkarer120140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkarer120140.index}
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
                  name="paperLiningSkarer160"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLiningSkarer160.icon}
                          alt={orderItems.paperLiningSkarer160.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLiningSkarer160.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkarer160.index}
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

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline">
                Snarum
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="separateSnarum"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.separateSnarum.icon}
                          alt={orderItems.separateSnarum.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.separateSnarum.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.separateSnarum.index}
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
                  name="triangularCartonSnarum"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.triangularCartonSnarum.icon}
                          alt={orderItems.triangularCartonSnarum.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.triangularCartonSnarum.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.triangularCartonSnarum.index}
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
                  name="paperLiningSnarum8090"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLiningSnarum8090.icon}
                          alt={orderItems.paperLiningSnarum8090.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLiningSnarum8090.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSnarum8090.index}
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
                  name="paperLiningSnarum120140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLiningSnarum120140.icon}
                          alt={orderItems.paperLiningSnarum120140.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLiningSnarum120140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSnarum120140.index}
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
                  name="paperLiningSnarum160"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLiningSnarum160.icon}
                          alt={orderItems.paperLiningSnarum160.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLiningSnarum160.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSnarum160.index}
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

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="text-slate-100 text-md hover:no-underline">
                Skotterud
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={form.control}
                  name="separateSkotterud"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.separateSkotterud.icon}
                          alt={orderItems.separateSkotterud.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.separateSkotterud.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.separateSkotterud.index}
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
                  name="triangularCartonSkotterud"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.triangularCartonSkotterud.icon}
                          alt={orderItems.triangularCartonSkotterud.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.triangularCartonSkotterud.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.triangularCartonSkotterud.index}
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
                  name="paperLiningSkotterud8090"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLiningSkotterud8090.icon}
                          alt={orderItems.paperLiningSkotterud8090.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLiningSkotterud8090.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkotterud8090.index}
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
                  name="paperLiningSkotterud120140"
                  render={({ field }) => (
                    <FormItem className="flex gap-4 items-center justify-between border-b py-5 border-gray-500">
                      <FormLabel className="flex gap-4 items-center text-slate-100 text-md">
                        <Image
                          src={orderItems.paperLiningSkotterud120140.icon}
                          alt={orderItems.paperLiningSkotterud120140.PL}
                          width={36}
                          height={36}
                        />
                        {orderItems.paperLiningSkotterud120140.PL}
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-4 !m-0">
                          <span className="text-gray-400 text-sm">
                            {orderItems.paperLiningSkotterud120140.index}
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
};
