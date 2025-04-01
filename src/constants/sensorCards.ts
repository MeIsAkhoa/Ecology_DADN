// src/constants.ts
import { Thermometer, Droplets, Sun, CloudRain } from "lucide-react";

export const SENSOR_CARDS = [
    {
      title: "Nhiệt độ",
      key: "temperature",
      lastUpdateKey: "lastTemperatureUpdate",
      standard: "20°C - 35°C",
      bgColor: "bg-red-100 text-red-700",
      Icon: Thermometer,
    },
    {
      title: "Độ ẩm không khí",
      key: "humidity",
      lastUpdateKey: "lastHumidityUpdate",
      standard: "40% - 70%",
      bgColor: "bg-blue-100 text-blue-700",
      Icon: Droplets,
    },
    {
      title: "Cường độ ánh sáng",
      key: "lightIntensity",
      lastUpdateKey: "lastLightIntensityUpdate",
      standard: "1000 - 5000 lux",
      bgColor: "bg-yellow-100 text-yellow-700",
      Icon: Sun,
    },
    {
      title: "Độ ẩm đất",
      key: "soilMoisture",
      lastUpdateKey: "lastSoilMoistureUpdate",
      standard: "30% - 60%",
      bgColor: "bg-green-100 text-green-700",
      Icon: CloudRain,
    },
  ];
  