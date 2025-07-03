"use client";

import { CpsPageFormType } from "@/types";
import { cpsPageSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const useChooseMachine = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CpsPageFormType>({
    defaultValues: {
      machine: { value: "DW L1", label: "DW L1" },
    },
    resolver: zodResolver(cpsPageSchema),
  });

  const handleTouchStart = (e: any) => {
    e.preventDefault();
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<CpsPageFormType> = (data) => {
    setIsLoading(true);

    const query = {
      machine: data.machine?.value || "",
    };

    const queryString = new URLSearchParams(query).toString();

    router.push(`/cps/order?${queryString}`);
  };

  return {
    form,
    isLoading,
    onSubmit,
    handleTouchStart,
  };
};
