import { useState } from "react";
import Humidity from "../components/chart_Humid";
import Light from "../components/chart_Light";
import SolidMoisture from "../components/chart_SoildMoisture";
import Temperature from "../components/chart_Temperature";
import SensorDashboard from "../components/real_data_chart";

export default function CurrentData() {
  const [selectedData, setSelectedData] = useState("temperature");
  return (
    <div className="lg:ml-70 items-center justify-center h-screen bg-gray-100 ">
      <div className="bg-white rounded-xl shadow-md z-0">
        <SensorDashboard />
      </div>
      <div>
        <div className="mt-2 bg-white rounded-xl shadow-md">
          <select
            className="h-10 border-2 border-black rounded-lg"
            value={selectedData}
            onChange={(e) => setSelectedData(e.target.value)}
          >
            <option value="temperature">Nhiệt độ</option>
            <option value="humidity">Độ ẩm không khí</option>
            <option value="light">Cường độ ánh sáng</option>
            <option value="soilMoisture">Độ ẩm đất</option>
          </select>
          <div className="">
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
