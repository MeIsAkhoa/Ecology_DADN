import { HumidityCard, LightCard, TemperatureCard } from "../components/real_data_chart";

export default function CurrentData() {
    return (
      <div className="grid grid-cols-3 gap-4 p-6">
      <TemperatureCard value={28} />
      <HumidityCard value={65} />
      <LightCard value={1200} />
    </div>
    )
  }

