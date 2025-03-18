import WateringControl from "../components/C1_watering";
import LightingControl from "../components/C2_lighting";
import DataRecord from "../components/C3_DataRecord";
import SetUpLimit from "../components/C4_SetUpLimit";

export default function Config() {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">⚙️ Điều chỉnh hệ thống</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all">
          <WateringControl />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all">
          <LightingControl />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all">
          <DataRecord />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all">
          <SetUpLimit />
        </div>
      </div>
    </div>
  );
}
