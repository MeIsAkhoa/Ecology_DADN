import WateringControl from "../components/controller/WateringControl";
import LightingControl from "../components/controller/LightingControl";
import TempLimit from "../components/controller/TempLimit";
import LightLimit from "../components/controller/LightLimit";
import HumidLimit from "../components/controller/HumidLimit";
import SoilLimit from "../components/controller/SoilLimit";
import ThresholdDashboard from "../components/controller/LimitData";

export default function Config() {
  return (
    <div className="lg:ml-70 p-6 min-h-screen bg-gray-100 dark:bg-[#172A46]">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-200 dark:bg-gray-600">
        <div className={`p-3 bg-green-400 text-white font-medium dark:bg-green-600`}>
          📊 Thông Số Môi Trường
        </div>
        <ThresholdDashboard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <WateringControl />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <LightingControl />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <TempLimit />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <LightLimit />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <HumidLimit />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <SoilLimit />
        </div>
      </div>
    </div>
  );
}
