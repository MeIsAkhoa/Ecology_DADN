import { useEffect, useState } from "react";
import api from "../utils/baseURL";
import { Thermometer, Droplets, Sun, CloudRain } from "lucide-react"; // Import icon từ Lucide React

type SensorCardProps = {
  title: string;
  value: number;
  timestamp: string | null;
  standard: string;
  bgColor: string;
  Icon: React.ElementType;
};

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

  // useEffect(() => {
  //   let isMounted = true; // Biến kiểm tra component có bị unmount không
  
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get("/adafruit/latest");
  
  //       if (response.status === 200 && response.data.code === 200) {
  //         if (isMounted) {
  //           setSensorData(response.data.result);
  //           console.log("✅ Dữ liệu cảm biến:", response.data.result);
  //         }
  //       } else {
  //         console.warn("⚠ API trả về mã không hợp lệ:", response.data);
  //       }
  //     } catch (error: any) {
  //       if (error.response) {
  //         console.error("❌ Lỗi API:", error.response.status, error.response.data);
  //       } else if (error.request) {
  //         console.error("❌ Không nhận được phản hồi từ API:", error.request);
  //       } else {
  //         console.error("❌ Lỗi không xác định:", error.message);
  //       }
  //     }
  //   };
  
  //   fetchData();
  //   const interval = setInterval(fetchData, 2000); // Gọi API mỗi 2 giây
  
  //   return () => {
  //     isMounted = false; // Ngăn cập nhật state sau khi unmount
  //     clearInterval(interval);
  //   };
  // }, []);

  const sensorCards = [
    {
      title: "Nhiệt độ",
      value: sensorData.temperature,
      timestamp: sensorData.lastTemperatureUpdate,
      standard: "Tiêu chuẩn: 20°C - 35°C",
      bgColor: "bg-red-200",
      Icon: Thermometer,
    },
    {
      title: "Độ ẩm không khí",
      value: sensorData.humidity,
      timestamp: sensorData.lastHumidityUpdate,
      standard: "Tiêu chuẩn: 40% - 70%",
      bgColor: "bg-blue-200",
      Icon: Droplets,
    },
    {
      title: "Cường độ ánh sáng",
      value: sensorData.lightIntensity,
      timestamp: sensorData.lastLightIntensityUpdate,
      standard: "Tiêu chuẩn: 1000 - 5000 lux",
      bgColor: "bg-yellow-200",
      Icon: Sun,
    },
    {
      title: "Độ ẩm đất",
      value: sensorData.soilMoisture,
      timestamp: sensorData.lastSoilMoistureUpdate,
      standard: "Tiêu chuẩn: 30% - 60%",
      bgColor: "bg-green-200",
      Icon: CloudRain,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {sensorCards.map((sensor, index) => (
        <SensorCard
          key={index}
          title={sensor.title}
          value={sensor.value}
          timestamp={sensor.timestamp}
          standard={sensor.standard}
          bgColor={sensor.bgColor}
          Icon={sensor.Icon}
        />
      ))}
    </div>
  );
};

// Component hiển thị từng cảm biến
const SensorCard: React.FC<SensorCardProps> = ({ title, value, timestamp, standard, bgColor, Icon }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md flex flex-col items-center ${bgColor}`}>
      <Icon className="w-10 h-10 text-gray-700 mb-2" /> {/* Icon */}
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="text-xl font-semibold text-gray-900">{value}</p>
      <p className="text-sm text-gray-700">
        Cập nhật: {timestamp ? new Date(timestamp).toLocaleString() : "Chưa có dữ liệu"}
      </p>
      <p className="text-xs text-gray-600">{standard}</p>
    </div>
  );
};

export default SensorDashboard;
