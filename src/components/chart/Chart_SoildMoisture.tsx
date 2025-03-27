import React from "react";
import { API_ENDPOINTS } from "../../constants/Api";
import { useSensorData } from "../../hooks/useSensorData.hook";
import Chart from "./Chart.component";

const SoilMoisture = () => {
  const { data, loading, error } = useSensorData(API_ENDPOINTS.SENSOR_SOIL_MOISTURE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <Chart data={data} color="#ff7300" title="Soil Moisture Data" />
    </div>
  );
};

export default SoilMoisture; 