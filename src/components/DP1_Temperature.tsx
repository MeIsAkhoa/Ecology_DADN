import React, { useState, useEffect } from "react";
import { FaTemperatureHigh, FaTint, FaLightbulb } from "react-icons/fa";

const TemperatureChartWithInfo: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [lighting, setLighting] = useState<number>(0); // Dữ liệu ánh sáng
  const [lastTemperatureUpdate, setLastTemperatureUpdate] = useState<string | null>(null);
  const [lastHumidityUpdate, setLastHumidityUpdate] = useState<string | null>(null);
  const [lastLightingUpdate, setLastLightingUpdate] = useState<string | null>(null);

  const token = "your_token_here"; // Lấy token của bạn từ localStorage hoặc context

  useEffect(() => {
    // Lấy dữ liệu từ API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/adafruit/latest", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // Gửi token trong header
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (result.code === 200) {
          // Lưu kết quả nhận được từ API
          setTemperature(result.result.temperature || 0.0);
          setHumidity(result.result.humidity || 0.0);
          setLighting(result.result.lightIntensity || 0.0);
          setLastTemperatureUpdate(result.result.lastTemperatureUpdate || null);
          setLastHumidityUpdate(result.result.lastHumidityUpdate || null);
          setLastLightingUpdate(result.result.lastLightIntensityUpdate || null);
        } else {
          console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="p-6 bg-gradient-to-l from-green-100 to-green-250 rounded-2xl shadow-lg">
      {/* Info Section: 3 khung cùng 1 hàng */}
      <div className="flex justify-between items-center mb-6 space-x-6">
        {/* Temperature */}
        <div className="w-full max-w-xs border-2 border-white p-6 rounded-2xl flex flex-col items-center space-y-4 transform transition-all hover:scale-105 hover:shadow-2xl bg-transparent">
          <FaTemperatureHigh size={40} className="text-red-500" />
          <div className="text-3xl font-semibold">{temperature}°C</div>
          <div className="text-lg text-gray-700">{lastTemperatureUpdate ? `Last update: ${lastTemperatureUpdate}` : "No data available"}</div>
        </div>

        {/* Humidity */}
        <div className="w-full max-w-xs border-2 border-white p-6 rounded-2xl flex flex-col items-center space-y-4 transform transition-all hover:scale-105 hover:shadow-2xl bg-transparent">
          <FaTint size={40} className="text-blue-500" />
          <div className="text-3xl font-semibold">{humidity}%</div>
          <div className="text-lg text-gray-700">{lastHumidityUpdate ? `Last update: ${lastHumidityUpdate}` : "No data available"}</div>
        </div>

        {/* Lighting */}
        <div className="w-full max-w-xs border-2 border-white p-6 rounded-2xl flex flex-col items-center space-y-4 transform transition-all hover:scale-105 hover:shadow-2xl bg-transparent">
          <FaLightbulb size={40} className="text-yellow-500" />
          <div className="text-3xl font-semibold">{lighting}</div>
          <div className="text-lg text-gray-700">{lastLightingUpdate ? `Last update: ${lastLightingUpdate}` : "No data available"}</div>
        </div>
      </div>

      {/* General Info */}
      <div className="text-center space-y-4">
        <p className="text-2xl font-semibold text-gray-800">Current Temperature: {temperature}°C</p>
        <p className="text-2xl font-semibold text-gray-800">Current Humidity: {humidity}%</p>
        <p className="text-2xl font-semibold text-gray-800">Current Light Intensity: {lighting}</p>
      </div>
    </div>
  );
};

export default TemperatureChartWithInfo;
