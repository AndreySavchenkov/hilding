import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/hooks/useUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/ui/custom-button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { registerSchema } from "@/types/schemas";

export function RegisterForm() {
  const { setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      workerNumber: "",
      securityCode: "",
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
        body: JSON.stringify(data),
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

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Imię</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Wprowadź imię"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Nazwisko</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Wprowadź nazwisko"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="workerNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">
                  Numer pracownika
                </FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    className="flex justify-center mt-2"
                  >
                    <InputOTPGroup className="gap-2 md:gap-4">
                      {[0, 1, 2, 3].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-14 h-14 md:w-16 md:h-16 text-2xl md:text-4xl text-white bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-red-400 mt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="securityCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">
                  Kod bezpieczeństwa
                </FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    className="flex justify-center mt-2"
                  >
                    <InputOTPGroup className="gap-2 md:gap-4">
                      {[0, 1, 2, 3].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-14 h-14 md:w-16 md:h-16 text-2xl md:text-4xl text-white bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-red-400 mt-2" />
              </FormItem>
            )}
          />

          <CustomButton isLoading={isLoading} text="Zaloguj się" />
        </form>
      </Form>
    </div>
  );
}
