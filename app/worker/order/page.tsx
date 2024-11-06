"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import OrderForm from "./components/order-form/OrderForm";
import { L5Form } from "./components/l5-form/L5Form";
import { LinesEnum } from "@/types";

function OrderContent() {
  const searchParams = useSearchParams();
  const line = searchParams?.get("line");

  return (
    <>
      {line === LinesEnum.L10 && <OrderForm />}
      {line === LinesEnum.L5 && <L5Form />}
    </>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderContent />
    </Suspense>
  );
}
