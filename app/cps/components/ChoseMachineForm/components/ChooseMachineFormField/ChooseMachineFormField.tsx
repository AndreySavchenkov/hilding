"use client";

import Select from "react-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { CpsPageFormType } from "@/types";
import { customWorkerPageStyles } from "@/styles";

type ChooseMachineFormFieldProps = {
  form: UseFormReturn<CpsPageFormType>;
  handleTouchStart: (e: any) => void;
  options: { value: string; label: string }[];
  name: "machine";
  label: string;
};

export const ChooseMachineFormField = ({
  form,
  handleTouchStart,
  options,
  name,
  label,
}: ChooseMachineFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">
            {label}
          </FormLabel>
          <FormControl onTouchStart={handleTouchStart}>
            <Select
              {...field}
              styles={customWorkerPageStyles}
              options={options}
              className="mt-2"
            />
          </FormControl>
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};
