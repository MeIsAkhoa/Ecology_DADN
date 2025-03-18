import { Thermometer, Droplets, Sun } from "lucide-react";
import { JSX } from "react/jsx-runtime";

type SensorCardProps = {
  title: string;
  value: number;
  unit: string;
  icon: JSX.Element;
  standard: string;
  color: string;
};

const SensorCard = ({ title, value, unit, icon, standard, color }: SensorCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center w-full">
      <div className="flex items-center">
        <div className={`w-12 h-12 ${color}`}>{icon}</div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">
            {value} {unit}
          </p>
        </div>
      </div>
      <div className="mt-2 sm:mt-0 text-center">
        <p className="text-sm text-gray-500">
          Chuẩn: <span className="font-semibold">{standard}</span>
        </p>
      </div>
    </div>
  );
};

export const TemperatureCard = ({ value }: { value: number }) => (
  <SensorCard
    title="Nhiệt độ"
    value={value}
    unit="°C"
    icon={<Thermometer className="text-red-500" />}
    standard="25°C"
    color="text-red-500"
  />
);

export const HumidityCard = ({ value }: { value: number }) => (
  <SensorCard
    title="Độ ẩm"
    value={value}
    unit="%"
    icon={<Droplets className="text-blue-500" />}
    standard="75%"
    color="text-blue-500"
  />
);

export const LightCard = ({ value }: { value: number }) => (
  <SensorCard
    title="Ánh sáng"
    value={value}
    unit="lx"
    icon={<Sun className="text-yellow-500" />}
    standard="3000 lx"
    color="text-yellow-500"
  />
);
