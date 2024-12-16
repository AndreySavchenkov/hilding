"use client";

import { AreaOptionsEnum, OrderType, orderItems } from "@/types";
import Image from "next/image";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

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

      // toast({
      //   duration: 3000,
      //   description: (
      //     <div className="flex items-center gap-3">
      //       <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
      //         <CheckIcon className="h-5 w-5 text-white" />
      //       </div>
      //       <span className="font-medium text-white">
      //         Zamówienie zostało przyjęte!
      //       </span>
      //     </div>
      //   ),
      //   className:
      //     "bg-gradient-to-r from-gray-900 to-gray-800 border-l-4 border-green-500 shadow-xl",
      // });

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
    <motion.div
    key={item.id}
    initial={{ 
      opacity: 0, 
      scale: 0.8,
      y: -100 // начальная позиция выше на 100px
    }}
    animate={{ 
      opacity: 1, 
      scale: 1,
      y: 0 // конечная позиция
    }}
    transition={{
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    }}
    exit={{
      opacity: 0,
      scale: 0.8,
      x: 100,
      y: -100,
      rotate: 15,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }}
      className="flex gap-3 flex-col text-gray-300 bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-sm"
    >
      <span className="text-xl md:text-2xl font-medium text-center py-3 border-b border-gray-500/30 text-gray-200">
        Linia: {item.lineOptions} ({AreaOptionsEnum[item.areaOptions]})
      </span>

      <div className="flex gap-6 flex-col mt-2">
        <div className="flex gap-3 flex-col">
          {item.pallets ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.pallets.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.pallets.index}
                </span>
                <Image
                  src={orderItems.pallets.icon}
                  alt={orderItems.pallets.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.scotchTape ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.scotchTape.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.scotchTape.index}
                </span>
                <Image
                  src={orderItems.scotchTape.icon}
                  alt={orderItems.scotchTape.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.whiteBraid ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.whiteBraid.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.whiteBraid.index}
                </span>
                <Image
                  src={orderItems.whiteBraid.icon}
                  alt={orderItems.whiteBraid.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.blackBelt ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.blackBelt.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.blackBelt.index}
                </span>
                <Image
                  src={orderItems.blackBelt.icon}
                  alt={orderItems.blackBelt.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.whiteBelt ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.whiteBelt.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.whiteBelt.index}
                </span>
                <Image
                  src={orderItems.whiteBelt.icon}
                  alt={orderItems.whiteBelt.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLining90 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLining90.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLining90.index}
                </span>
                <Image
                  src={orderItems.paperLining90.icon}
                  alt={orderItems.paperLining90.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLining101 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLining101.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLining101.index}
                </span>
                <Image
                  src={orderItems.paperLining101.icon}
                  alt={orderItems.paperLining101.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.downPaperXFirm ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.downPaperXFirm.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.downPaperXFirm.index}
                </span>
                <Image
                  src={orderItems.downPaperXFirm.icon}
                  alt={orderItems.downPaperXFirm.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.downPaperVagstranda ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.downPaperVagstranda.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.downPaperVagstranda.index}
                </span>
                <Image
                  src={orderItems.downPaperVagstranda.icon}
                  alt={orderItems.downPaperVagstranda.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.upPaperCommon ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.upPaperCommon.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.upPaperCommon.index}
                </span>
                <Image
                  src={orderItems.upPaperCommon.icon}
                  alt={orderItems.upPaperCommon.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.upPaperVagstranda ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.upPaperVagstranda.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.upPaperVagstranda.index}
                </span>
                <Image
                  src={orderItems.upPaperVagstranda.icon}
                  alt={orderItems.upPaperVagstranda.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.cartonBox80 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.cartonBox80.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.cartonBox80.index}
                </span>
                <Image
                  src={orderItems.cartonBox80.icon}
                  alt={orderItems.cartonBox80.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.cartonBox90 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.cartonBox90.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.cartonBox90.index}
                </span>
                <Image
                  src={orderItems.cartonBox90.icon}
                  alt={orderItems.cartonBox90.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.cartonBox120 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.cartonBox120.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.cartonBox120.index}
                </span>
                <Image
                  src={orderItems.cartonBox120.icon}
                  alt={orderItems.cartonBox120.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.cartonBox140 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.cartonBox140.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.cartonBox140.index}
                </span>
                <Image
                  src={orderItems.cartonBox140.icon}
                  alt={orderItems.cartonBox140.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.cartonBox160 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.cartonBox160.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.cartonBox160.index}
                </span>
                <Image
                  src={orderItems.cartonBox160.icon}
                  alt={orderItems.cartonBox160.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.cartonBox180 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.cartonBox180.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.cartonBox180.index}
                </span>
                <Image
                  src={orderItems.cartonBox180.icon}
                  alt={orderItems.cartonBox180.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.stretch ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.stretch.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.stretch.index}
                </span>
                <Image
                  src={orderItems.stretch.icon}
                  alt={orderItems.stretch.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.nylon8090 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.nylon8090.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.nylon8090.index}
                </span>
                <Image
                  src={orderItems.nylon8090.icon}
                  alt={orderItems.nylon8090.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.nylon120140 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.nylon120140.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.nylon120140.index}
                </span>
                <Image
                  src={orderItems.nylon120140.icon}
                  alt={orderItems.nylon120140.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.nylon160 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.nylon160.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.nylon160.index}
                </span>
                <Image
                  src={orderItems.nylon160.icon}
                  alt={orderItems.nylon160.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.nylon180 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">{orderItems.nylon180.PL}</span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.nylon180.index}
                </span>
                <Image
                  src={orderItems.nylon180.icon}
                  alt={orderItems.nylon180.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.separateSkarer ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.separateSkarer.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.separateSkarer.index}
                </span>
                <Image
                  src={orderItems.separateSkarer.icon}
                  alt={orderItems.separateSkarer.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.triangularCartonSkarer ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.triangularCartonSkarer.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.triangularCartonSkarer.index}
                </span>
                <Image
                  src={orderItems.triangularCartonSkarer.icon}
                  alt={orderItems.triangularCartonSkarer.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLiningSkarer8090 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLiningSkarer8090.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLiningSkarer8090.index}
                </span>
                <Image
                  src={orderItems.paperLiningSkarer8090.icon}
                  alt={orderItems.paperLiningSkarer8090.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLiningSkarer105 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLiningSkarer105.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLiningSkarer105.index}
                </span>
                <Image
                  src={orderItems.paperLiningSkarer105.icon}
                  alt={orderItems.paperLiningSkarer105.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLiningSkarer120140 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLiningSkarer120140.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLiningSkarer120140.index}
                </span>
                <Image
                  src={orderItems.paperLiningSkarer120140.icon}
                  alt={orderItems.paperLiningSkarer120140.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLiningSkarer160 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLiningSkarer160.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLiningSkarer160.index}
                </span>
                <Image
                  src={orderItems.paperLiningSkarer160.icon}
                  alt={orderItems.paperLiningSkarer160.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.separateSnarum ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.separateSnarum.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.separateSnarum.index}
                </span>
                <Image
                  src={orderItems.separateSnarum.icon}
                  alt={orderItems.separateSnarum.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.triangularCartonSnarum ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.triangularCartonSnarum.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.triangularCartonSnarum.index}
                </span>
                <Image
                  src={orderItems.triangularCartonSnarum.icon}
                  alt={orderItems.triangularCartonSnarum.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLiningSnarum8090 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLiningSnarum8090.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLiningSnarum8090.index}
                </span>
                <Image
                  src={orderItems.paperLiningSnarum8090.icon}
                  alt={orderItems.paperLiningSnarum8090.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLiningSnarum120140 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLiningSnarum120140.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLiningSnarum120140.index}
                </span>
                <Image
                  src={orderItems.paperLiningSnarum120140.icon}
                  alt={orderItems.paperLiningSnarum120140.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLiningSnarum160 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLiningSnarum160.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLiningSnarum160.index}
                </span>
                <Image
                  src={orderItems.paperLiningSnarum160.icon}
                  alt={orderItems.paperLiningSnarum160.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.separateSkotterud ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.separateSkotterud.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.separateSkotterud.index}
                </span>
                <Image
                  src={orderItems.separateSkotterud.icon}
                  alt={orderItems.separateSkotterud.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.triangularCartonSkotterud ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.triangularCartonSkotterud.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.triangularCartonSkotterud.index}
                </span>
                <Image
                  src={orderItems.triangularCartonSkotterud.icon}
                  alt={orderItems.triangularCartonSkotterud.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLiningSkotterud8090 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLiningSkotterud8090.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLiningSkotterud8090.index}
                </span>
                <Image
                  src={orderItems.paperLiningSkotterud8090.icon}
                  alt={orderItems.paperLiningSkotterud8090.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}

          {item.paperLiningSkotterud120140 ? (
            <div className="flex items-center w-full text-sm md:text-base justify-between p-2 hover:bg-gray-600/20 rounded-lg transition-colors">
              <span className="w-32 md:w-36">
                {orderItems.paperLiningSkotterud120140.PL}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 font-medium">
                  {orderItems.paperLiningSkotterud120140.index}
                </span>
                <Image
                  src={orderItems.paperLiningSkotterud120140.icon}
                  alt={orderItems.paperLiningSkotterud120140.PL}
                  width={32}
                  height={32}
                  className="opacity-90"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {isLoading ? (
        <Button disabled className="mt-6 text-lg p-6 opacity-70">
          <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />
        </Button>
      ) : (
        <Button
          className="mt-6 text-lg p-6 bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
          onClick={() => deleteOrder(item.id)}
        >
          Dostarczyć
        </Button>
      )}
    </motion.div>
  );
};
