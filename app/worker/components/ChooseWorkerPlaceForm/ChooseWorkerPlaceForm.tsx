"use client";

import { Form } from "@/components/ui/form";
import { areaOptions, lineOptions } from "@/types";
import { CustomButton } from "@/components/ui/custom-button";
import { useChooseWorkerPlace } from "@/hooks/useChooseWorkerPlace";
import { ChooseFormField } from "./components/ChooseFormField/ChooseFormField";

const FormFields = [
  {
    label: "Linia produkcyjna:",
    name: "line" as const,
    options: lineOptions,
  },
  {
    label: "Stanawisko:",
    name: "area" as const,
    options: areaOptions,
  },
];

export const ChooseWorkerPlaceForm = () => {
  const { form, isLoading, onSubmit, handleTouchStart } =
    useChooseWorkerPlace();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <div className="flex flex-col space-y-6">
          {FormFields.map((field) => (
            <ChooseFormField
              key={field.name}
              form={form}
              handleTouchStart={handleTouchStart}
              options={field.options}
              name={field.name}
              label={field.label}
            />
          ))}
        </div>

        <CustomButton isLoading={isLoading} text="Dalej" />
      </form>
    </Form>
  );
};
