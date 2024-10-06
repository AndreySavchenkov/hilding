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
