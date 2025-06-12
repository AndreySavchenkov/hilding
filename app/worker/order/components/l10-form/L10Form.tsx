"use client";

import { Form } from "@/components/ui/form";
import { Accordion } from "@/components/ui/accordion";
import {
  beltsFieldsL10,
  cartonBoxFieldsL10,
  commonFieldsL10,
  defaultValuesL10Form,
  downPaperFieldsL10,
  paperLiningFieldsL10,
  stretchFieldsL10,
  upPaperFieldsL10,
} from "@/types";
import { L10FormSchema } from "@/types/schemas";
import { OrderFormField } from "@/components/ui/order-form-field";
import { CustomButton } from "@/components/ui/custom-button";
import { useLineForm } from "@/hooks/useLineForm";
import { CustomAccordionItem } from "@/components/ui/custom-accordion-item";

export default function L10Form() {
  const { form, isLoading, onSubmit } = useLineForm(
    L10FormSchema,
    defaultValuesL10Form
  );

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-4 my-8 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm"
        >
          {commonFieldsL10.map((field) => (
            <OrderFormField
              key={field.name}
              form={form}
              name={field.name}
              item={field.item}
            />
          ))}

          <Accordion type="single" collapsible className="space-y-2 mt-2">
            <CustomAccordionItem
              value={'belts'}
              title="Uchwyt"
              fields={beltsFieldsL10}
              form={form}
            />

            <CustomAccordionItem
              value={'paperLining'}
              title="Paleta Papierowa"
              fields={paperLiningFieldsL10}
              form={form}
            />

            <CustomAccordionItem
              value={'downPaper'}
              title="Przekładka papierowa (do palety)"
              fields={downPaperFieldsL10}
              form={form}
            />

            <CustomAccordionItem
              value={'upPaper'}
              title="Pokrywa papierowa (góra)"
              fields={upPaperFieldsL10}
              form={form}
            />

            <CustomAccordionItem
              value={'cartonBox'}
              title="Carton Box (Vagstranda)"
              fields={cartonBoxFieldsL10}
              form={form}
            />

            <CustomAccordionItem
              value={'stretch'}
              title="Strecz / Nylon do Rolpaka"
              fields={stretchFieldsL10}
              form={form}
            />
          </Accordion>

          <CustomButton isLoading={isLoading} text="Wysłać" />
        </form>
      </Form>
    </div>
  );
}
