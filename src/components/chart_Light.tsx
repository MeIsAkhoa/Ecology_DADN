import Chart from "./Chart";
import usePollingFetch from "../hooks/usePollingFetch";
import { API_ENDPOINTS } from "../constants/Api";

const Light = () => {
  const { data, loading, error } = usePollingFetch<{ id: string; timestamp: string; numericValue: number }[]>(
    API_ENDPOINTS.SENSOR_LIGHT,
    { limit: 20 },
    30000
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <Chart data={data || []} color="#ff7300" title="Light Data" />
    </div>
  );
};

export default Light;
