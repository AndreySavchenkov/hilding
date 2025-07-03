"use client";
import { CustomButton } from "@/components/ui/custom-button";
import { Form } from "@/components/ui/form";
import { OrderFormField } from "@/components/ui/order-form-field";
import { useLineForm } from "@/hooks/useLineForm";
import { defaultValuesCpsForm, fieldsCpsForm } from "@/types";
import { cpsOrderSchema, cpsPageSchema } from "@/types/schemas";

export default function CpsOrderPage() {
  const { form, isLoading, onSubmit } = useLineForm(
    cpsOrderSchema,
    defaultValuesCpsForm
  );

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-4 my-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm"
        >
          {fieldsCpsForm.map((field) => (
            <OrderFormField
              key={field.name}
              form={form}
              name={field.name}
              item={field.item}
            />
          ))}

          <div className="flex justify-center">
            <CustomButton isLoading={isLoading} text="Wysłać" />
          </div>
        </form>
      </Form>
    </div>
  );
}
