import { useState } from "react";
import { useUser } from "./useUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/types/schemas";
import { roleOptions } from "@/types";
import { z } from "zod";

export const useRegister = () => {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      workerNumber: "",
      securityCode: "",
      role: roleOptions[0],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          role: data.role.value,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Błąd rejestracji");
      }

      const user = await response.json();
      setUser(user);
      form.reset();
    } catch (error) {
      console.error(error);
      form.setError("root", {
        message: error instanceof Error ? error.message : "Błąd rejestracji",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
}