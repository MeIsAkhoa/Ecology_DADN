import TemperatureChart from "../components/H1_Temperature";
import HumidityChart from "../components/H2_Humidity";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trang chủ</h1>

      <div className="mb-6">
        <TemperatureChart />
      </div>
      
      <div>
        <HumidityChart />
      </div>
    </div>
  );
}
