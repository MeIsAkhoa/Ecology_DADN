import { useEffect, useRef, useState } from "react";
import api from "../../utils/baseURL";
import { SENSOR_CARDS } from "../../constants/SensorCards";
import { API_ENDPOINTS } from "../../constants/Api";

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 0.0,
    lastTemperatureUpdate: null,
    humidity: 0.0,
    lastHumidityUpdate: null,
    lightIntensity: 0.0,
    lastLightIntensityUpdate: null,
    soilMoisture: 0.0,
    lastSoilMoistureUpdate: null,
  });

  const lastDataRef = useRef(sensorData);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await api.get(API_ENDPOINTS.SENSOR_LATEST);

        if (response.status === 200 && response.data.code === 200) {
          const result = response.data.result;

          if (JSON.stringify(lastDataRef.current) === JSON.stringify(result)) {
            console.log("🔄 Dữ liệu không thay đổi, không update state.");
            return;
          }

          if (isMounted) {
            setSensorData({
              temperature: result.temperature ?? 0.0,
              lastTemperatureUpdate: result.lastTemperatureUpdate ?? null,
              humidity: result.humidity ?? 0.0,
              lastHumidityUpdate: result.lastHumidityUpdate ?? null,
              lightIntensity: result.lightIntensity ?? 0.0,
              lastLightIntensityUpdate: result.lastLightIntensityUpdate ?? null,
              soilMoisture: result.soilMoisture ?? 0.0,
              lastSoilMoistureUpdate: result.lastSoilMoistureUpdate ?? null,
            });

            lastDataRef.current = result;
            console.log("✅ Cập nhật dữ liệu mới:", result);
          }
        } else {
          console.warn("⚠ API trả về mã không hợp lệ:", response.data);
        }
      } catch (error: any) {
        console.error("❌ Lỗi khi gọi API:", error.response?.status, error.response?.data || error.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 px-10 py-5 justify-center">
      {SENSOR_CARDS.map((sensor, index) => (
        <SensorCard
          key={index}
          title={sensor.title}
          value={sensorData[sensor.key as keyof typeof sensorData] ?? ""}
          timestamp={sensorData[sensor.lastUpdateKey as keyof typeof sensorData]?.toString() ?? null}
          standard={sensor.standard}
          bgColor={sensor.bgColor}
          Icon={sensor.Icon}
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
}

const SensorCard: React.FC<SensorCardProps> = ({ title, value, timestamp, bgColor, Icon }) => {
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
      <p className="text-3xl font-extrabold text-black tracking-wide drop-shadow">{value}</p>
      <p className="text-sm text-black opacity-90">{title}</p>
      <div className="absolute bottom-3 text-xs text-black opacity-80 flex items-center gap-1">
        <span className="text-lg">⏰</span>
        {formatTimestamp(timestamp)}
      </div>
    </div>
  );
};

export default SensorDashboard;
