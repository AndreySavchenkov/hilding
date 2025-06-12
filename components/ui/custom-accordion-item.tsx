import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OrderFormField } from "@/components/ui/order-form-field";
import {
  defaultValuesL10Form,
  defaultValuesL5Form,
  OrderItemType,
} from "@/types";
import { UseFormReturn } from "react-hook-form";

type CustomAccordionItemProps = {
  value: string;
  title: string;
  fields: {
    name: keyof typeof defaultValuesL5Form | keyof typeof defaultValuesL10Form;
    item: OrderItemType;
  }[];
  form: UseFormReturn<any>;
};

export const CustomAccordionItem = ({
  value,
  title,
  fields,
  form,
}: CustomAccordionItemProps) => {
  return (
    <AccordionItem
      value={value}
      className="border-0 rounded-lg overflow-hidden"
    >
      <AccordionTrigger className="text-slate-100 text-md hover:no-underline py-4 px-4 bg-gray-800/30 rounded-lg">
        {title}
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pt-2">
        {fields.map((field) => (
          <OrderFormField
            key={field.name}
            form={form}
            name={field.name}
            item={field.item}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
