import { SENSOR_CARDS } from "../../constants/sensorCards";
import { API_ENDPOINTS } from "../../constants/Api";
import useFetch from "../../hooks/useFetch";
import Claymorphism from 'react_claymorphism'

interface SensorData {
  temperature: number;
  lastTemperatureUpdate: string | null;
  humidity: number;
  lastHumidityUpdate: string | null;
  lightIntensity: number;
  lastLightIntensityUpdate: string | null;
  soilMoisture: number;
  lastSoilMoistureUpdate: string | null;
}

const SensorDashboard = () => {
  const { data: sensorData, error, loading } = useFetch<SensorData>(
    API_ENDPOINTS.SENSOR_LATEST,
    {},
    10000 
  );

  const currentData = sensorData || {
    temperature: 0.0,
    lastTemperatureUpdate: null,
    humidity: 0.0,
    lastHumidityUpdate: null,
    lightIntensity: 0.0,
    lastLightIntensityUpdate: null,
    soilMoisture: 0.0,
    lastSoilMoistureUpdate: null,
  };

  if (error) {
    console.error("Error fetching sensor data:", error);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-10 py-5 justify-center">
      {SENSOR_CARDS.map((sensor, index) => (
        <SensorCard
          key={index}
          title={sensor.title}
          value={currentData[sensor.key as keyof SensorData] ?? ""}
          timestamp={currentData[sensor.lastUpdateKey as keyof SensorData]?.toString() ?? null}
          standard={sensor.standard}
          bgColor={sensor.bgColor}
          Icon={sensor.Icon}
          loading={loading}
        />
      ))}
    </div>
  );
};

interface SensorCardProps {
  title: string;
  value: number | string;
  timestamp: string | null;
  standard: string;
  bgColor: string;
  Icon: React.ElementType;
  loading: boolean;
}

const SensorCard: React.FC<SensorCardProps> = ({ 
  title, 
  value, 
  timestamp, 
  bgColor, 
  Icon,
  loading 
}) => {
  const formatTimestamp = (timestamp: string | null) => {
    if (!timestamp) return "Chưa cập nhật";
    return new Date(timestamp).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  return (
    <div
      className={`w-52 h-52 flex flex-col items-center justify-center rounded-full border-4 border-black shadow-xl ${bgColor} 
                transform transition-all hover:scale-110 hover:shadow-2xl p-5 text-center relative`}
    >
      <Icon className="w-14 h-14 mb-2 text-black drop-shadow-lg filter brightness-110" />
      <p className="text-3xl font-extrabold text-black tracking-wide drop-shadow">
        {loading ? "..." : value}
      </p>
      <p className="text-sm text-black opacity-90">{title}</p>
      <div className="absolute bottom-3 text-xs text-black opacity-80 flex items-center gap-1">
        <span className="text-lg">⏰</span>
        {loading ? "Đang cập nhật..." : formatTimestamp(timestamp)}
      </div>
    </div>
  );
};

export default SensorDashboard;