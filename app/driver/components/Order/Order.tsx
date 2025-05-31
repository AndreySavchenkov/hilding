import { AreaOptionsEnum, OrderType } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { OrderActions } from "./components/OrderActions/OrderActions";

type Props = {
  item: OrderType;
  setOptions: (item: OrderType[] | null) => void;
};

export const Order = ({ item, setOptions }: Props) => {
  return (
    <div className="flex gap-3 flex-col text-gray-300 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm">
      <span className="text-xl md:text-2xl font-medium text-center py-3 border-b border-gray-500/30 text-gray-200">
        Linia: {item.lineOptions} ({AreaOptionsEnum[item.areaOptions]})
      </span>

      <span className="text-sm text-gray-400 text-center">
        Zamówiono:{" "}
        {formatDistanceToNow(new Date(item.createdAt), {
          addSuffix: true,
          locale: pl,
        })}
      </span>

      <OrderActions item={item} setOptions={setOptions} />
    </div>
  );
};
