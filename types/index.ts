export type OrderType = {
  id: string;
  lineOptions: string;
  areaOptions: string;
  workerNumber: string;
  pallets: boolean;
  scotchTape: boolean;
  whiteBraid: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export const lineOptions = [
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L5", label: "L5" },
  { value: "L10", label: "L10" },
];

export const areaOptions = [
  { value: "Start", label: "Klejenie" },
  { value: "Middle", label: "Ubieranie" },
  { value: "Finish", label: "Pakowanie" },
];
