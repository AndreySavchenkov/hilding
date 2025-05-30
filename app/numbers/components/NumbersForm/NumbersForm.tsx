import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NumbersFormType } from "../../page";
import { UseFormReturn } from "react-hook-form";

type NumbersFormProps = {
  onSubmit: (data: NumbersFormType) => void;
  form: UseFormReturn<NumbersFormType, any, undefined>;
  isLoading: boolean;
};

export const NumbersForm = ({
  onSubmit,
  form,
  isLoading,
}: NumbersFormProps) => {
  return (
    <div className="w-full max-w-screen-lg px-4 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full pt-10"
        >
          <div className="flex flex-col gap-5 w-full">
            <FormField
              control={form.control}
              name="workerNumber"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col items-center">
                  <FormLabel className="text-3xl font-black bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent mb-10 tracking-wide">
                    Numer IKEA:
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={8}
                      containerClassName="gap-0"
                      {...field}
                    >
                      <InputOTPGroup className="m-0 p-0 gap-0 group">
                        {[0, 1, 2].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="text-white text-4xl h-14 bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-white/50"
                          />
                        ))}
                      </InputOTPGroup>

                      <span className="text-blue-300 text-5xl font-bold animate-pulse">
                        .
                      </span>

                      <InputOTPGroup>
                        {[3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="text-white text-4xl h-14 bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-white/50"
                          />
                        ))}
                      </InputOTPGroup>

                      <span className="text-blue-300 text-5xl font-bold animate-pulse">
                        .
                      </span>

                      <InputOTPGroup>
                        {[6, 7].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="text-white text-4xl h-14 bg-white/10 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:bg-white/20 focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder:text-white/50"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="text-red-400 mt-4 animate-shake font-semibold" />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            className="max-w-md w-full mt-12 py-12 text-3xl bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-bold tracking-wide rounded-xl"
            type="submit"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-pulse">Szukam</span>
                <span className="animate-bounce">...</span>
              </span>
            ) : (
              "Szukać"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
