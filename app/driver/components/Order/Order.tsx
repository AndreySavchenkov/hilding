"use client";

import { AreaOptionsEnum, OrderType, orderItems } from "@/types";
import Image from "next/image";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import okIcon from "../../../../public/OK.png";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  item: OrderType;
  setOptions: (item: OrderType[] | null) => void;
};

export const Order = ({ item, setOptions }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const deleteOrder = async (orderId: string) => {
    setIsLoading(true);

    try {
      const apiUrl = `/api/order/${orderId}/delete`;

      const requestData = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(apiUrl, requestData);

      if (!response.ok) {
        throw new Error(`Failed to delete`);
      }

      toast({
        duration: 3000,
        title: "Zamówienie zostało usunięte!",
        description: (
          <Image
            src={okIcon}
            alt="ok"
            width={36}
            height={36}
            className="fixed top-8 right-6"
          />
        ),
        variant: "default",
        className: "bg-gray-500 text-gray-300 border-none",
      });

      const responseItems = await fetch(`/api/order/get-order-options`, {
        cache: "no-store",
      });

      const data = await responseItems.json();

      setOptions(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        duration: 5000,
        title: "Some Error! :(",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      key={item.id}
      className="flex gap-2 flex-col text-gray-300 bg-gray-700 p-3 rounded-lg"
    >
      <span className="text-2xl text-center pb-4 border-b-2 border-gray-500 text-gray-300">
        Linia: {item.lineOptions} ({AreaOptionsEnum[item.areaOptions]})
      </span>

      <div className="flex gap-8 flex-col mt-4">
        <div className="flex gap-4 flex-col">
          {item.pallets ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.pallets.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.pallets.index}
                </span>
                <Image
                  src={orderItems.pallets.icon}
                  alt={orderItems.pallets.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.scotchTape ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.scotchTape.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.scotchTape.index}
                </span>
                <Image
                  src={orderItems.scotchTape.icon}
                  alt={orderItems.scotchTape.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.whiteBraid ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.whiteBraid.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.whiteBraid.index}
                </span>
                <Image
                  src={orderItems.whiteBraid.icon}
                  alt={orderItems.whiteBraid.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.blackBelt ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.blackBelt.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.blackBelt.index}
                </span>
                <Image
                  src={orderItems.blackBelt.icon}
                  alt={orderItems.blackBelt.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.whiteBelt ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.whiteBelt.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.whiteBelt.index}
                </span>
                <Image
                  src={orderItems.whiteBelt.icon}
                  alt={orderItems.whiteBelt.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.paperLining90 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.paperLining90.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.paperLining90.index}
                </span>
                <Image
                  src={orderItems.paperLining90.icon}
                  alt={orderItems.paperLining90.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.paperLining101 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.paperLining101.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.paperLining101.index}
                </span>
                <Image
                  src={orderItems.paperLining101.icon}
                  alt={orderItems.paperLining101.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.downPaperXFirm ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.downPaperXFirm.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.downPaperXFirm.index}
                </span>
                <Image
                  src={orderItems.downPaperXFirm.icon}
                  alt={orderItems.downPaperXFirm.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.downPaperVagstranda ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.downPaperVagstranda.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.downPaperVagstranda.index}
                </span>
                <Image
                  src={orderItems.downPaperVagstranda.icon}
                  alt={orderItems.downPaperVagstranda.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.upPaperCommon ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.upPaperCommon.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.upPaperCommon.index}
                </span>
                <Image
                  src={orderItems.upPaperCommon.icon}
                  alt={orderItems.upPaperCommon.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.upPaperVagstranda ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.upPaperVagstranda.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.upPaperVagstranda.index}
                </span>
                <Image
                  src={orderItems.upPaperVagstranda.icon}
                  alt={orderItems.upPaperVagstranda.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.cartonBox80 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.cartonBox80.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.cartonBox80.index}
                </span>
                <Image
                  src={orderItems.cartonBox80.icon}
                  alt={orderItems.cartonBox80.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.cartonBox90 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.cartonBox90.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.cartonBox90.index}
                </span>
                <Image
                  src={orderItems.cartonBox90.icon}
                  alt={orderItems.cartonBox90.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.cartonBox120 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.cartonBox120.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.cartonBox120.index}
                </span>
                <Image
                  src={orderItems.cartonBox120.icon}
                  alt={orderItems.cartonBox120.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.cartonBox140 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.cartonBox140.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.cartonBox140.index}
                </span>
                <Image
                  src={orderItems.cartonBox140.icon}
                  alt={orderItems.cartonBox140.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.cartonBox160 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.cartonBox160.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.cartonBox160.index}
                </span>
                <Image
                  src={orderItems.cartonBox160.icon}
                  alt={orderItems.cartonBox160.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.cartonBox180 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.cartonBox180.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.cartonBox180.index}
                </span>
                <Image
                  src={orderItems.cartonBox180.icon}
                  alt={orderItems.cartonBox180.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.stretch ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.stretch.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.stretch.index}
                </span>
                <Image
                  src={orderItems.stretch.icon}
                  alt={orderItems.stretch.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.nylon8090 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.nylon8090.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.nylon8090.index}
                </span>
                <Image
                  src={orderItems.nylon8090.icon}
                  alt={orderItems.nylon8090.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.nylon120140 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.nylon120140.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.nylon120140.index}
                </span>
                <Image
                  src={orderItems.nylon120140.icon}
                  alt={orderItems.nylon120140.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.nylon160 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.nylon160.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.nylon160.index}
                </span>
                <Image
                  src={orderItems.nylon160.icon}
                  alt={orderItems.nylon160.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
          {item.nylon180 ? (
            <div className="flex gap-4 items-center w-full text-md justify-between">
              <span className="w-36">{orderItems.nylon180.PL}</span>
              <div className="flex gap-4 items-center">
                <span className="text-gray-400">
                  {orderItems.nylon180.index}
                </span>
                <Image
                  src={orderItems.nylon180.icon}
                  alt={orderItems.nylon180.PL}
                  width={36}
                  height={36}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {isLoading ? (
        <Button disabled className="mt-8 text-xl p-8">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          className="mt-8 text-xl p-8"
          onClick={() => deleteOrder(item.id)}
        >
          Dostarczyć
        </Button>
      )}
    </div>
  );
};
