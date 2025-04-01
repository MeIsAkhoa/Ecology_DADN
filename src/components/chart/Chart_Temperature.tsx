import Chart from "./Chart";
import { API_ENDPOINTS } from "../../constants/Api";
import useFetch from "../../hooks/useFetch";

const Temperature = () => {
  const { data, loading, error } = useFetch<{ id: string; timestamp: string; numericValue: number }[]>(
    API_ENDPOINTS.SENSOR_TEMPERATURE,
    { limit: 20 },
    30000
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <Chart data={data || []} color="#ff7300" title="" />
    </div>
  );
};

export default Temperature;
