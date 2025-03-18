import TemperatureChartWithInfo from "../components/DP1_Temperature"

export default function CurrentData() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Điều kiện hiện tại</h1>

      <div className="mb-6">
        <TemperatureChartWithInfo />
      </div>
    </div>
  )
}