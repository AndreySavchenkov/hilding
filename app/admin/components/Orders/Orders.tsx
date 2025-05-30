import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { calculateDeliveryTime } from "@/helpers/calculateDeliveryTime";
import { formatName } from "@/helpers/formatName";
import { getDeliveryTimeColor } from "@/helpers/getDeliveryTimeColor";
import { AreaOptionsEnum } from "@/types";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

type OrdersProps = {
  orders: any[];
};

export const Orders = ({ orders }: OrdersProps) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 md:p-8 border border-gray-700">
      <Accordion type="single" collapsible>
        <AccordionItem value="orders" className="border-0">
          <AccordionTrigger className="text-lg md:text-xl font-semibold text-gray-200 hover:no-underline">
            Zamówienia
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 md:p-6">
                  <p className="text-gray-400 text-center">Brak zamówień</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 md:p-6"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                          <div>
                            <h3 className="text-base md:text-lg font-medium text-gray-200">
                              Linia: {order.lineOptions} (
                              {
                                AreaOptionsEnum[
                                  order.areaOptions as keyof typeof AreaOptionsEnum
                                ]
                              }
                              )
                            </h3>
                            <div className="text-xs md:text-sm text-gray-400 mt-1 space-y-0.5">
                              <p>
                                Utworzono:{" "}
                                {format(
                                  new Date(order.createdAt),
                                  "dd.MM.yyyy HH:mm",
                                  {
                                    locale: pl,
                                  }
                                )}{" "}
                              </p>
                              {order.deliveredAt && (
                                <p>
                                  Dostarczone w:{" "}
                                  <span
                                    className={`${getDeliveryTimeColor(
                                      new Date(order.createdAt),
                                      new Date(order.deliveredAt)
                                    )}`}
                                  >
                                    {calculateDeliveryTime(
                                      new Date(order.createdAt),
                                      new Date(order.deliveredAt)
                                    )}
                                  </span>
                                </p>
                              )}
                            </div>
                          </div>
                          <span
                            className={`self-start px-3 py-1 rounded-full text-xs md:text-sm ${
                              order.deliveredAt
                                ? "bg-green-500/20 text-green-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}
                          >
                            {order.deliveredAt ? "Dostarczono" : "W trakcie"}
                          </span>
                        </div>

                        <div className="text-xs md:text-sm space-y-1">
                          <p className="text-gray-400">
                            Utworzył:{" "}
                            {formatName(
                              order.createdBy.firstName,
                              order.createdBy.lastName
                            )}{" "}
                            ({order.createdBy.workerNumber})
                          </p>
                          {order.deliveredBy && (
                            <p className="text-gray-400">
                              Dostarczył:{" "}
                              {formatName(
                                order.deliveredBy.firstName,
                                order.deliveredBy.lastName
                              )}{" "}
                              ({order.deliveredBy.workerNumber})
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
