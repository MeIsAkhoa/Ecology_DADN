import { useState } from "react";
import Humidity from "../components/chart/Chart_Humid";
import Light from "../components/chart/Chart_Light";
import SolidMoisture from "../components/chart/Chart_SoildMoisture";
import Temperature from "../components/chart/Chart_Temperature";
import SensorDashboard from "../components/chart/RealDataChart";

export default function CurrentData() {
  const [selectedData, setSelectedData] = useState<"temperature" | "humidity" | "light" | "soilMoisture">("temperature");

  // Màu sắc tương ứng cho từng loại dữ liệu
  const dataColors = {
    temperature: "bg-gradient-to-r from-red-400 to-orange-400",
    humidity: "bg-gradient-to-r from-blue-400 to-cyan-400",
    light: "bg-gradient-to-r from-yellow-400 to-amber-400",
    soilMoisture: "bg-gradient-to-r from-green-400 to-emerald-400"
  };

  return (
    <div className="lg:ml-70 min-h-screen p-4 dark:bg-[#172A46]">
      {/* Phần dashboard chính */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-200 dark:bg-gray-600">
        <div className={`p-3 bg-green-400 text-white font-medium dark:bg-green-600`}>
          📊 Thông Số Môi Trường
        </div>
        <SensorDashboard />
      </div>

      {/* Phần lựa chọn và hiển thị biểu đồ */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 dark:bg-gray-600">
        <div className={`p-3 ${dataColors[selectedData]} text-white font-medium rounded-t-xl`}>
          📈 Biểu Đồ Chi Tiết
        </div>
        
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
              {selectedData === "temperature" && "🌡️ Nhiệt Độ"}
              {selectedData === "humidity" && "💧 Độ Ẩm Không Khí"}
              {selectedData === "light" && "☀️ Cường Độ Ánh Sáng"}
              {selectedData === "soilMoisture" && "🌱 Độ Ẩm Đất"}
            </h2>
            
            <select
              className={`h-10 border-2 rounded-lg px-3 focus:ring-2 focus:ring-opacity-50 transition-all dark:bg-white
                ${selectedData === "temperature" ? "border-orange-300 focus:ring-orange-200" : ""}
                ${selectedData === "humidity" ? "border-blue-300 focus:ring-blue-200" : ""}
                ${selectedData === "light" ? "border-amber-300 focus:ring-amber-200" : ""}
                ${selectedData === "soilMoisture" ? "border-emerald-300 focus:ring-emerald-200" : ""}
              `}
              value={selectedData}
              onChange={(e) => setSelectedData(e.target.value as "temperature" | "humidity" | "light" | "soilMoisture")}
            >
              <option value="temperature">Nhiệt độ</option>
              <option value="humidity">Độ ẩm không khí</option>
              <option value="light">Cường độ ánh sáng</option>
              <option value="soilMoisture">Độ ẩm đất</option>
            </select>
          </div>

          <div className="border-t border-gray-100 pt-4">
            {selectedData === "temperature" && <Temperature />}
            {selectedData === "humidity" && <Humidity />}
            {selectedData === "light" && <Light />}
            {selectedData === "soilMoisture" && <SolidMoisture />}
          </div>
        </div>
      </div>
    </div>
  );
}