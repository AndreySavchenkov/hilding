"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CommonFormSchema } from "@/types/schemas";
import { motion } from "framer-motion";
import { OrderItemType } from "@/types";

type OrderFormFieldProps = {
  form: UseFormReturn<z.infer<typeof CommonFormSchema>>;
  name: keyof z.infer<typeof CommonFormSchema>;
  item: OrderItemType;
};

export const OrderFormField = ({ form, name, item }: OrderFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`
              flex gap-4 items-center justify-between border-b border-gray-500/30 py-4 
              rounded-lg px-2 cursor-pointer
            `}
          onClick={() => field.onChange(!field.value)}
        >
          <FormLabel className="flex gap-3 items-center text-slate-100 text-sm md:text-md flex-1 cursor-pointer select-none">
            <div className="relative">
              <Image
                src={item.icon}
                alt={item.PL}
                width={32}
                height={32}
                className="rounded-lg shadow-md "
                loading="lazy"
                sizes="32px"
              />
              {field.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
            {item.PL}
          </FormLabel>
          <span className="!mt-0 text-gray-400 text-sm font-medium select-none">
            {item.index}
          </span>
          <FormControl>
            <div
              className="flex items-center gap-4 !m-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Checkbox
                className="w-7 h-7 md:w-9 md:h-9 
                  border-2 border-blue-400/50 
                  data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-blue-600
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
  );
};
