import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import { NumbersIKEA } from "@/types";
import { NumbersFormType, WorkerResultType } from "@/app/numbers/page";

const formSchema: ZodType<NumbersFormType> = z.object({
  workerNumber: z
    .string({
      required_error: "Numer musi składać się z 8 znaków",
    })
    .min(8, {
      message: "Numer musi składać się z 8 znaków",
    }),
});

export const useFindNumbers = () => {
  const [result, setResult] = useState<WorkerResultType | null>(null);
  const [isOpenResult, setIsOpenResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NumbersFormType>({
    resolver: zodResolver(formSchema),
  });

  const { reset } = form;

  const handleClose = () => {
    setIsOpenResult(false);
    setResult(null);
    reset();
  };

  const onSubmit: SubmitHandler<NumbersFormType> = (data) => {
    try {
      setIsLoading(true);
      const number = NumbersIKEA.find(
        (item) => item.number.replace(/\./g, "") === data.workerNumber
      );
      setResult(number || null);
    } catch (error) {
      console.error("Error finding number:", error);
      setResult(null);
    } finally {
      setIsLoading(false);
      setIsOpenResult(true);
    }
  };

  return {
    form,
    result,
    handleClose,
    onSubmit,
    isLoading,
    isOpenResult,
  };
};
