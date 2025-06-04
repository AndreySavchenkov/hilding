import { WorkerPageFormType } from "@/types";
import { workerPageSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const useChooseWorkerPlace = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<WorkerPageFormType>({
    defaultValues: {
      line: { value: "L10", label: "L10" },
      area: { value: "Finish", label: "Pakowanie" },
    },
    resolver: zodResolver(workerPageSchema),
  });

  const handleTouchStart = (e: any) => {
    e.preventDefault();
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<WorkerPageFormType> = (data) => {
    setIsLoading(true);

    const query = {
      line: data.line?.value || "",
      area: data.area?.value || "",
    };

    const queryString = new URLSearchParams(query).toString();

    router.push(`/worker/order?${queryString}`);
  };

  return {
    form,
    isLoading,
    onSubmit,
    handleTouchStart,
  };
};
