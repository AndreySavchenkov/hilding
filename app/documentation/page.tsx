"use client";

import { useState } from "react";
import { MattressCore, mattressCores, MattressFirmness } from "@/types";
import Select from "react-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { customWorkerPageStyles } from "@/styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const options = mattressCores.map((item) => ({
  value: item.name,
  label: item.name,
}));

type FormData = {
  mattressCore: { value: string; label: string };
};

const PATTERN_28 = [2, 7, 4, 6, 4, 7, 2]; // для длины 206
const PATTERN_26 = [2, 6, 4, 6, 4, 6, 2]; // для длины 196
const PATTERN_TYPES = [2, 1, 2, 1, 2, 1, 2]; // 2 — синяя, 1 — серая

const MattressInfoCard = ({ mattress }: { mattress: MattressCore }) => {
  const isValevag =
    mattress.name.toLowerCase().includes("valevag") ||
    mattress.name.toLowerCase().includes("vale");

  let basePattern: number[] = [];
  if (isValevag) {
    if (mattress.size.length === 206) {
      basePattern = PATTERN_28;
    } else if (mattress.size.length === 196) {
      basePattern = PATTERN_26;
    }
  }

  const allRows: number[] = [];
  mattress.numberOfPockets.forEach((pocket) => {
    for (let i = 0; i < pocket.count; i++) {
      allRows.push(pocket.size);
    }
  });
  const totalRows = allRows.length;
  const maxCols = Math.max(...allRows);
  const firstRowIdx = allRows[0] === maxCols ? 0 : allRows.length - 1;
  const marginForNumbers =
    allRows[firstRowIdx] < maxCols
      ? {
          marginLeft: `${((maxCols - allRows[firstRowIdx]) * 8) / 2}px`,
          marginRight: `${((maxCols - allRows[firstRowIdx]) * 8) / 2}px`,
        }
      : undefined;

  const getPatternArray = (rowSize: number) => {
    if (!isValevag || basePattern.length === 0) {
      return Array(rowSize).fill(2);
    }
    let pattern: number[] = [];
    basePattern.forEach((count, i) => {
      for (let j = 0; j < count; j++) {
        pattern.push(PATTERN_TYPES[i]);
      }
    });
    while (pattern.length < rowSize) {
      pattern = pattern.concat(pattern);
    }
    return pattern.slice(0, rowSize);
  };

  const renderMattressVisualization = () => {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-[2px] max-w-full overflow-x-auto">
        <div className="mb-2 p-2 bg-gray-50 rounded border-b">
          <div className="flex flex-wrap gap-2 text-xs text-gray-700">
            <div className="flex items-center gap-1">
              <span className="font-medium">Długość:</span>
              <span>{mattress.size.length} cm</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Szerokość:</span>
              <span>{mattress.size.width} cm</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">Wysokość:</span>
              <span>{mattress.size.height} cm</span>
            </div>
          </div>
        </div>

        {mattress.springs.length > 1 && (
          <div className="mb-1 flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 border border-blue-600 inline-block" />
              <span className="text-[8px] text-gray-700">Sprężyna 2</span>
            </div>
            <div className="flex items-center gap-0.5">
              <span className="w-2 h-2 rounded-full bg-gray-400 border border-gray-500 inline-block" />
              <span className="text-[8px] text-gray-700">Sprężyna 1</span>
            </div>
          </div>
        )}
        <div className="flex">
          <div>
            <div
              className="flex flex-col gap-0.5"
              style={{ minWidth: "fit-content" }}
            >
              {allRows.map((rowSize, rowIdx) => {
                const isEdgeRow =
                  isValevag && (rowIdx < 2 || rowIdx >= totalRows - 2);
                const pattern =
                  isValevag && !isEdgeRow ? getPatternArray(rowSize) : [];
                const diff = maxCols - rowSize;
                return (
                  <div
                    key={rowIdx}
                    className="flex gap-0.5 items-center"
                    style={
                      diff > 0
                        ? {
                            marginLeft: `${(diff * 5) / 2}px`,
                            marginRight: `${(diff * 5) / 2}px`,
                          }
                        : undefined
                    }
                  >
                    <span className="text-[8px] text-gray-500 w-2 text-right mr-0.5 select-none">
                      {rowIdx + 1}
                    </span>
                    {Array.from({ length: rowSize }).map((_, colIdx) => {
                      let colorClass = "bg-blue-500 border-blue-600";
                      if (isValevag) {
                        if (isEdgeRow) {
                          colorClass = "bg-blue-500 border-blue-600";
                        } else {
                          colorClass =
                            pattern[colIdx] === 2
                              ? "bg-blue-500 border-blue-600"
                              : "bg-gray-400 border-gray-500";
                        }
                      }
                      return (
                        <div
                          key={colIdx}
                          className={`w-2 h-2 rounded-full border ${colorClass}`}
                        />
                      );
                    })}
                  </div>
                );
              })}
              <div className="flex gap-0.5 items-center mt-1">
                <span className="w-2" />
                {Array.from({ length: maxCols }).map((_, colIdx) => (
                  <span
                    key={colIdx}
                    className="w-2 block text-center text-[8px] text-gray-500 select-none leading-[8px]"
                  >
                    {colIdx + 1}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-2 space-y-6 border border-gray-700">
      <div className="border-b border-gray-600 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent mb-2">
          {mattress.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-300 text-sm">Index:</p>
            <p className="font-semibold text-white">{mattress.index}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          {renderMattressVisualization()}
        </div>
      </div>

      <div className="border-b border-gray-600 pb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Sprężyny</h3>
        <div className="space-y-2">
          {mattress.springs.map((spring, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-gray-300 text-sm">
                {mattress.springs.length === 1
                  ? "Sprężyna"
                  : `Sprężyna ${index + 1}`}
                :
              </span>
              <span className="font-semibold text-white">
                {spring.thickness} mm
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-200">
          Długość 10 kieszeni
        </h3>
        <p className="font-semibold text-lg text-white">
          {mattress.lengthOf10Pockets} cm
        </p>
      </div>
    </div>
  );
};

export default function Documentation() {
  const [currentItem, setCurrentItem] = useState<MattressCore>(
    mattressCores[0]
  );

  const form = useForm<FormData>({
    defaultValues: {
      mattressCore: {
        value: mattressCores[0].name,
        label: mattressCores[0].name,
      },
    },
    resolver: zodResolver(
      z.object({
        mattressCore: z.object({
          value: z.string(),
          label: z.string(),
        }),
      })
    ),
  });

  const handleTouchStart = (e: any) => {
    e.preventDefault();
  };

  const handleSelectChange = (selectedOption: any) => {
    const selectedCore = mattressCores.find(
      (core) => core.name === selectedOption.value
    );
    if (selectedCore) {
      setCurrentItem(selectedCore);
    }
  };

  return (
    <div className="h-[calc(100vh-83px)] max-w-screen-lg mx-auto px-1 py-4 overflow-y-auto bg-gray-900 text-white">
      <Form {...form}>
        <div className="flex flex-col space-y-8">
          <FormField
            control={form.control}
            name="mattressCore"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl onTouchStart={handleTouchStart}>
                  <Select
                    {...field}
                    styles={customWorkerPageStyles}
                    options={options}
                    className="mt-2"
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                      handleSelectChange(selectedOption);
                    }}
                    isSearchable={false}
                    isClearable={false}

                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>
      </Form>

      <div className="mt-8">
        <MattressInfoCard mattress={currentItem} />
      </div>
    </div>
  );
}
