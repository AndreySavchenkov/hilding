import { differenceInMinutes, differenceInHours } from "date-fns";

export const calculateDeliveryTime = (createdAt: Date, deliveredAt: Date) => {
  const minutesDiff = differenceInMinutes(deliveredAt, createdAt);
  const hoursDiff = differenceInHours(deliveredAt, createdAt);

  if (hoursDiff > 0) {
    return `${hoursDiff} godz ${minutesDiff % 60} min`;
  }
  return `${minutesDiff} min`;
};