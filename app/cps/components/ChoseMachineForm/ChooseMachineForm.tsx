"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { useChooseMachine } from "@/hooks/useChooseMachine";
import { Form } from "@/components/ui/form";
import { ChooseMachineFormField } from "./components/ChooseMachineFormField/ChooseMachineFormField";
import { machineOptions } from "@/types";

export const ChooseMachineForm = () => {
  const { form, isLoading, onSubmit, handleTouchStart } = useChooseMachine();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <div className="flex flex-col space-y-6">
          <ChooseMachineFormField
            key={1}
            form={form}
            handleTouchStart={handleTouchStart}
            options={machineOptions}
            name={"machine"}
            label={"Maszyna:"}
          />
        </div>

        <CustomButton isLoading={isLoading} text="Dalej" />
      </form>
    </Form>
  );
};
