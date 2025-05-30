"use client";

import { NoFoundState } from "./components/NoFoundState/NoFoundState";
import { ResultState } from "./components/ResultState/ResultState";
import { NumbersForm } from "./components/NumbersForm/NumbersForm";
import { useFindNumbers } from "@/hooks/useFindNumbers";

export type WorkerResultType = {
  name: string;
  number: string;
};

export type NumbersFormType = {
  workerNumber?: string;
};

export default function Numbers() {
  const { form, result, handleClose, onSubmit, isLoading, isOpenResult } =
    useFindNumbers();

  const isShowForm = !isOpenResult && !result;
  const isShowResult = isOpenResult && result;
  const isShowNoFound = isOpenResult && !result;

  return (
    <div className="h-full bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900">
      {isShowForm && (
        <NumbersForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      )}
      <div className="w-full max-w-screen-lg px-4 mx-auto h-full flex items-center justify-center">
        {isShowResult && (
          <ResultState handleClose={handleClose} result={result} />
        )}
        {isShowNoFound && <NoFoundState handleClose={handleClose} />}
      </div>
    </div>
  );
}
