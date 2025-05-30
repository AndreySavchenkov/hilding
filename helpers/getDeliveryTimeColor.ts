import { differenceInMinutes } from "date-fns";

export const getDeliveryTimeColor = (createdAt: Date, deliveredAt: Date) => {
  const minutesDiff = differenceInMinutes(deliveredAt, createdAt);

  if (minutesDiff <= 20) return "text-green-500";
  if (minutesDiff <= 60) return "text-yellow-500";
  return "text-red-500";
};
