"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { L5Form } from "./components/l5-form/L5Form";
import { LinesEnum } from "@/types";
import L1L2Form from "./components/l1l2-form/L1L2-form";
import L10Form from "./components/l10-form/L10Form";
import { Spinner } from "@/components/ui/spinner";

function OrderContent() {
  const searchParams = useSearchParams();
  const line = searchParams?.get("line");

  return (
    <>
      {line === LinesEnum.L10 && <L10Form />}
      {line === LinesEnum.L5 && <L5Form />}
      {line === LinesEnum.L1 && <L1L2Form />}
      {line === LinesEnum.L2 && <L1L2Form />}
    </>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <OrderContent />
    </Suspense>
  );
}
