import Image from "next/image";
import { OrderItemType } from "@/types";

type Props = {
  item: OrderItemType;
  itemKey: string;
};

export const OrderItem = ({ item, itemKey }: Props) => {
  if (!item) return null;

  return (
    <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
      <span className="w-32 md:w-36">{item.PL}</span>
      <div className="flex items-center gap-3">
        <span className="text-gray-400 font-medium">{item.index}</span>
        <Image
          src={item.icon}
          alt={item.PL}
          width={32}
          height={32}
          className="opacity-90"
        />
      </div>
    </div>
  );
};
