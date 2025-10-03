import { MattressCore } from "@/types";
import { MattressVisualization } from "./components/MattressVisualization";
import bigSpringImg from "../../../public/bigSpring.png";
import Image from "next/image";

export const MattressInfoCard = ({ mattress }: { mattress: MattressCore }) => {
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
          <MattressVisualization mattress={mattress} />
        </div>
      </div>

      <div className="border-b border-gray-600 pb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-200">
          Rozmiar Sprężyny  
          ({mattress.numberWireTurns} +- 0.25 zwojów)
        </h3>
        <div
          className="relative flex justify-center items-center"
          style={{ minHeight: 120 }}
        >
          <Image
            src={bigSpringImg}
            alt="Rozmiar Sprężyny"
            width={200}
            height={100}
            className="object-contain"
          />
          {/* Высота */}
          <span
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900 bg-opacity-80 px-1 rounded text-xs text-blue-200"
            style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
          >
            {mattress.springsSize.height} cm
          </span>
          {/* Ширина в начале */}
          <span className="absolute top-2 right-10 bg-gray-900 bg-opacity-80 px-1 rounded text-xs text-blue-200">
            {mattress.springsSize.startWidth} cm
          </span>
          {/* Ширина в середине */}
          <span className="absolute top-22 right-10 bg-gray-900 bg-opacity-80 px-1 rounded text-xs text-blue-200">
            {mattress.springsSize.middleWidth} cm
          </span>
          {/* Ширина в конце */}
          <span className="absolute top-44 right-10 bg-gray-900 bg-opacity-80 px-1 rounded text-xs text-blue-200">
            {mattress.springsSize.startWidth} cm
          </span>
        </div>
      </div>

      <div className="border-b border-gray-600 pb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-200">
          Typy Sprężyn
        </h3>
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
                {spring.thickness} mm ({spring.temperature.min}°C -{" "}
                {spring.temperature.max}°C)
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-b border-gray-600 pb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-200">Ustawenia</h3>
        <div className="space-y-2 space-x-2">
          <span className="text-gray-300 text-sm">Prędkość:</span>
          <span className="font-semibold text-white">{mattress.speed}</span>
        </div>
        <div className="space-y-2 space-x-2">
          <span className="text-gray-300 text-sm">Długość drutu:</span>
          <span className="font-semibold text-white">{mattress.maxWidthWire}</span>
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
