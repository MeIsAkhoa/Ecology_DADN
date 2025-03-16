import WateringControl from "../components/C1_watering";
import LightingControl from "../components/C2_lighting"
import DataRecord from "../components/C3_DataRecord"
import SetUpLimit from "../components/C4_SetUpLimit"

export default function Config() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Điều chỉnh</h1>

      <WateringControl />
      <LightingControl />
      <DataRecord />
      <SetUpLimit />
    </div>
  );
}
