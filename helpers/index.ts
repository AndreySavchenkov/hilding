import { differenceInMinutes, differenceInHours } from "date-fns";

export const formatName = (firstName: string, lastName: string) => {
  const formattedFirstName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  const formattedLastName = lastName.charAt(0).toUpperCase();

  return `${formattedFirstName} ${formattedLastName}.`;
};

export const calculateDeliveryTime = (createdAt: Date, deliveredAt: Date) => {
  const minutesDiff = differenceInMinutes(deliveredAt, createdAt);
  const hoursDiff = differenceInHours(deliveredAt, createdAt);

  if (hoursDiff > 0) {
    return `${hoursDiff} godz ${minutesDiff % 60} min`;
  }
  return `${minutesDiff} min`;
};

export const getDeliveryTimeColor = (createdAt: Date, deliveredAt: Date) => {
  const minutesDiff = differenceInMinutes(deliveredAt, createdAt);

  if (minutesDiff <= 20) return "text-green-500";
  if (minutesDiff <= 60) return "text-yellow-500";
  return "text-red-500";
};