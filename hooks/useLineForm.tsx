"use client";

import { useState } from "react";
import { useUser } from "./useUser";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SuccessToast } from "@/components/ui/successToast";
import { getOrderOptions } from "../helpers/getOrderOptions";

export const useLineForm = (schema: z.ZodSchema, defaultValues: {}) => {
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const { toast } = useToast();

  const line = searchParams?.get("line");
  const area = searchParams?.get("area");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsLoading(true);

    const orderOptions = getOrderOptions(user?.id, area, line, data);

    console.log(`orderOptions: `, orderOptions);

    try {
      const apiUrl = "/api/order/create-order";

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
        description: <SuccessToast text="Zamówienie wysłane!" />,
        className:
          "bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-white/10 backdrop-blur-sm shadow-xl",
      });

      router.push(`/`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};
