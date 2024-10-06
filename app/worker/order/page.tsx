"use client";

import { Suspense } from "react";
import OrderForm from "./components/order-form/OrderForm"; 

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderForm />
    </Suspense>
  );
}
