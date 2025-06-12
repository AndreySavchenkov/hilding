"use client";

import { Form } from "@/components/ui/form";
import { defaultValuesL1L2Form, fieldsL1L2 } from "@/types";
import { L1L2FormSchema } from "@/types/schemas";
import { OrderFormField } from "@/components/ui/order-form-field";
import { CustomButton } from "@/components/ui/custom-button";
import { useLineForm } from "@/hooks/useLineForm";

export default function L1L2Form() {
  const { form, isLoading, onSubmit } = useLineForm(
    L1L2FormSchema,
    defaultValuesL1L2Form
  );

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-4 my-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm"
        >
          {fieldsL1L2.map((field) => (
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
