import {
  MattressCore,
  PATTERN_26,
  PATTERN_28,
  PATTERN_TYPES,
  VATNESTROM_PATTERN,
  VATNESTROM_PATTERN_TYPES,
} from "@/types";

export const MattressVisualization = ({
  mattress,
}: {
  mattress: MattressCore;
}) => {
  const isValevag =
    mattress.name.toLowerCase().includes("valevag") ||
    mattress.name.toLowerCase().includes("vale");

  const isVatnestrom =
    mattress.name.toLowerCase().includes("vatnestrom") ||
    mattress.name.toLowerCase().includes("vatne");

  // Выбираем паттерн по типу матраса
  let basePattern: number[] = [];
  let patternTypes: number[] = [];

  if (isValevag) {
    if (mattress.size.length === 206) {
      basePattern = PATTERN_28;
    } else if (mattress.size.length === 196) {
      basePattern = PATTERN_26;
    }
    patternTypes = PATTERN_TYPES;
  } else if (isVatnestrom) {
    basePattern = VATNESTROM_PATTERN;
    patternTypes = VATNESTROM_PATTERN_TYPES;
  }

  // Собираем все ряды по данным из numberOfPockets (сверху вниз)
  const allRows: number[] = [];
  mattress.numberOfPockets.forEach((pocket) => {
    for (let i = 0; i < pocket.count; i++) {
      allRows.push(pocket.size);
    }
  });
  const totalRows = allRows.length;
  const maxCols = Math.max(...allRows); // длина самого длинного ряда
  const firstRowIdx = allRows[0] === maxCols ? 0 : allRows.length - 1; // ищем индекс самого длинного ряда (обычно первый или последний)
  const marginForNumbers =
    allRows[firstRowIdx] < maxCols
      ? {
          marginLeft: `${((maxCols - allRows[firstRowIdx]) * 8) / 2}px`,
          marginRight: `${((maxCols - allRows[firstRowIdx]) * 8) / 2}px`,
        }
      : undefined;

  // Функция для получения паттерна нужной длины
  const getPatternArray = (rowSize: number) => {
    if ((!isValevag && !isVatnestrom) || basePattern.length === 0) {
      return Array(rowSize).fill(2); // fallback: все синие
    }
    let pattern: number[] = [];
    basePattern.forEach((count, i) => {
      for (let j = 0; j < count; j++) {
        pattern.push(patternTypes[i]);
      }
    });
    // Если длина не совпала — повторяем или обрезаем
    while (pattern.length < rowSize) {
      pattern = pattern.concat(pattern);
    }
    return pattern.slice(0, rowSize);
  };
  return (
    <div className="bg-gray-700 border border-gray-600 rounded-lg p-1 max-w-full overflow-x-auto">
      {/* Информация о размерах на польском */}
      <div className="mb-2 p-2 bg-gray-600 rounded border-b border-gray-500">
        <div className="flex flex-wrap gap-4 text-xs text-gray-200">
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

      {/* Подсказки по типам пружин только если их больше одной */}
      {mattress.springs.length > 1 && (
        <div className="mb-1 flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 border border-blue-600 inline-block" />
            <span className="text-[8px] text-gray-300">Sprężyna 2</span>
          </div>
          <div className="flex items-center gap-0.5">
            <span className="w-2 h-2 rounded-full bg-gray-400 border border-gray-500 inline-block" />
            <span className="text-[8px] text-gray-300">Sprężyna 1</span>
          </div>
        </div>
      )}
      <div className="flex">
        <div>
          <div className="flex flex-col" style={{ minWidth: "fit-content" }}>
            {allRows.map((rowSize, rowIdx) => {
              const isEdgeRow =
                (isValevag || isVatnestrom) &&
                (rowIdx < 2 || rowIdx >= totalRows - 2);
              const pattern =
                (isValevag || isVatnestrom) && !isEdgeRow
                  ? getPatternArray(rowSize)
                  : [];
              const diff = maxCols - rowSize;
              return (
                <div
                  key={rowIdx}
                  className="flex gap-0.5 items-center"
                  style={
                    diff > 0
                      ? {
                          marginLeft: `${(diff * 10) / 2}px`,
                          marginRight: `${(diff * 5) / 2}px`,
                        }
                      : undefined
                  }
                >
                  <span className="text-[8px] text-gray-400 w-2 text-right mr-0.5 select-none">
                    {rowIdx + 1}
                  </span>
                  {Array.from({ length: rowSize }).map((_, colIdx) => {
                    let colorClass = "bg-blue-500 border-blue-600";
                    if (isValevag || isVatnestrom) {
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
            {/* Горизонтальная нумерация снизу, строго под кружками */}
            <div className="flex gap-0.5 items-center mt-1">
              <span className="w-2" />
              {Array.from({ length: maxCols }).map((_, colIdx) => (
                <span
                  key={colIdx}
                  className="w-2 block text-center text-[8px] text-gray-400 select-none leading-[8px]"
                >
                  {colIdx + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isValevag || isVatnestrom ? (
        <div className="mt-4 text-sm text-gray-300">
          <p>Strefa:</p>
          {/* Визуализация паттерна */}
          {basePattern.length > 0 && patternTypes.length > 0 && (
            <>
              {/* Визуализация паттерна */}
              <div className="flex gap-0.5 mt-1 justify-center">
                {basePattern.map((count, i) =>
                  Array.from({ length: count }).map((_, j) => {
                    const colorClass =
                      patternTypes[i] === 2
                        ? "bg-blue-500 border-blue-600"
                        : "bg-gray-400 border-gray-500";
                    return (
                      <div
                        key={`${i}-${j}`}
                        className={`w-4 h-4 rounded-full border ${colorClass}`}
                        title={`Strefa ${i + 1}`}
                      />
                    );
                  })
                )}
              </div>
              {/* Количество элементов каждого цвета, строго под цветами */}
              <div className="flex gap-0.5 mt-1 justify-center">
                {basePattern.map((count, i) =>
                  Array.from({ length: count }).map((_, j) => (
                    <span
                      key={`${i}-${j}`}
                      className="w-4 text-center text-xs text-gray-300 block"
                    >
                      {j === Math.floor(count / 2) ? count : ""}
                    </span>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};
