"use client";

import { useState } from "react";
import { MattressCore, mattressCores, MattressFirmness } from "@/types";
import Select from "react-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { customWorkerPageStyles } from "@/styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MattressInfoCard } from "./components/MattressInfoCard";

const options = mattressCores.map((item) => ({
  value: item.name,
  label: item.name,
}));

type FormData = {
  mattressCore: { value: string; label: string };
};

export default function Documentation() {
  const [currentItem, setCurrentItem] = useState<MattressCore>(
    mattressCores[0]
  );

  const form = useForm<FormData>({
    defaultValues: {
      mattressCore: {
        value: mattressCores[0].name,
        label: mattressCores[0].name,
      },
    },
    resolver: zodResolver(
      z.object({
        mattressCore: z.object({
          value: z.string(),
          label: z.string(),
        }),
      })
    ),
  });

  const handleTouchStart = (e: any) => {
    e.preventDefault();
  };

  const handleSelectChange = (selectedOption: any) => {
    const selectedCore = mattressCores.find(
      (core) => core.name === selectedOption.value
    );
    if (selectedCore) {
      setCurrentItem(selectedCore);
    }
  };

  return (
    <div className="h-[calc(100vh-83px)] max-w-screen-lg mx-auto px-1 py-4 overflow-y-auto bg-gray-900 text-white">
      <Form {...form}>
        <div className="flex flex-col space-y-8">
          <FormField
            control={form.control}
            name="mattressCore"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl onTouchStart={handleTouchStart}>
                  <Select
                    {...field}
                    styles={customWorkerPageStyles}
                    options={options}
                    className="mt-2"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      handleSelectChange(selectedOption);
                    }}
                    isSearchable={false}
                    isClearable={false}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </Form>

      <div className="mt-8">
        <MattressInfoCard mattress={currentItem} />
      </div>
    </div>
  );
}
