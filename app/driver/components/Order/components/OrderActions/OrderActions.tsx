"use client";

import { CustomButton } from "@/components/ui/custom-button";
import { useDelivery } from "@/hooks/useDelivery";
import { orderItems, OrderType } from "@/types";
import { OrderItem } from "./components/OrderItem";

type Props = {
  item: OrderType;
  setOptions: (item: OrderType[] | null) => void;
};

export const OrderActions = ({ item, setOptions }: Props) => {
  const { deleteOrder, isLoading } = useDelivery(setOptions);
  return (
    <>
      <div className="flex gap-6 flex-col mt-2">
        <div className="flex gap-3 flex-col">
          {Object.entries(orderItems).map(([key, itemData]) => {
            if (item[key as keyof OrderType]) {
              return <OrderItem key={key} itemKey={key} item={itemData} />;
            }
            return null;
          })}
        </div>
      </div>
      <div className="mx-auto">
        <CustomButton
          isLoading={isLoading}
          text="Dostarczyć"
          onClick={() => deleteOrder(item.id)}
        />
      </div>
    </>
  );
};
