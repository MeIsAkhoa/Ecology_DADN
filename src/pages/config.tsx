import WateringControl from "../components/controller/WateringControl";
import LightingControl from "../components/controller/LightingControl";
import DataRecord from "../components/controller/DataRecord";
import SetUpLimit from "../components/controller/SetUpLimit";

export default function Config() {
  return (
    <div className="lg:ml-70 p-6 min-h-screen bg-gray-100 dark:bg-[#172A46]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <WateringControl />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <LightingControl />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <DataRecord />
        </div>
        <div className="p-6 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all border-2 border-green-500 dark:border-4">
          <SetUpLimit />
        </div>
      </div>
    </div>
  );
}
