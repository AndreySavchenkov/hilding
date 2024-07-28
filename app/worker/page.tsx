"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";

type FormType = {
  line?: { value: string; label: string } | null;
  area?: { value: string; label: string } | null;
  idNumber?: string;
};

const lineOptions = [
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L10", label: "L10" },
];

const areaOptions = [
  { value: "Start", label: "Start" },
  { value: "Middle", label: "Middle" },
  { value: "Finish", label: "Finish" },
];

export default function Admin() {
  const { handleSubmit, control } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Выберите линию: </h2>
        <Controller
          name="line"
          control={control}
          render={({ field }) => <Select {...field} options={lineOptions} />}
        />
        <h2>Выберите рабочий участок: </h2>
        <Controller
          name="area"
          control={control}
          render={({ field }) => <Select {...field} options={areaOptions} />}
        />
        <h2>Введите свой ID номер: </h2>
        <Controller
          name="idNumber"
          control={control}
          render={({ field }) => (
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
