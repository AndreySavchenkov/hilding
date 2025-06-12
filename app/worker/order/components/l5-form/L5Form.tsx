"use client";

import { Form } from "@/components/ui/form";
import {
  commonFieldsL5,
  defaultValuesL5Form,
  skarerFieldsL5,
  skotterudFieldsL5,
  snarumFieldsL5,
} from "@/types";
import { Accordion } from "@/components/ui/accordion";
import { L5FormSchema } from "@/types/schemas";
import { OrderFormField } from "@/components/ui/order-form-field";
import { CustomButton } from "@/components/ui/custom-button";
import { useLineForm } from "@/hooks/useLineForm";
import { CustomAccordionItem } from "@/components/ui/custom-accordion-item";

export const L5Form = () => {
  const { form, isLoading, onSubmit } = useLineForm(
    L5FormSchema,
    defaultValuesL5Form
  );

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-4 my-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm"
        >
          {commonFieldsL5.map((field) => (
            <OrderFormField
              key={field.name}
              form={form}
              name={field.name}
              item={field.item}
            />
          ))}

          <Accordion type="single" collapsible className="space-y-2 mt-2">
            <CustomAccordionItem
              value={"skarer"}
              title="Skarer"
              fields={skarerFieldsL5}
              form={form}
            />

            <CustomAccordionItem
              value={"snarum"}
              title="Snarum"
              fields={snarumFieldsL5}
              form={form}
            />

            <CustomAccordionItem
              value={"skotterud"}
              title="Skotterud"
              fields={skotterudFieldsL5}
              form={form}
            />
          </Accordion>

          <CustomButton isLoading={isLoading} text="Wysłać" />
        </form>
      </Form>
    </div>
  );
};
