import Chart from "./Chart";
import usePollingFetch from "../hooks/usePollingFetch";
import { API_ENDPOINTS } from "../constants/Api";

const SolidMoisture = () => {
  const { data, loading, error } = usePollingFetch<{ id: string; timestamp: string; numericValue: number }[]>(
    API_ENDPOINTS.SENSOR_SOIL_MOISTURE,
    { limit: 20 },
    30000
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <Chart data={data || []} color="#ff7300" title="Soil Moisture Data" />
    </div>
  );
};

export default SolidMoisture;
