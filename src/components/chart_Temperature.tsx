import React, { useState, useEffect, useRef, useCallback } from "react";
import api from "../utils/baseURL";
import Chart from "./Chart";
import { API_ENDPOINTS } from "../constants/Api";

const Temperature = () => {
  const [data, setData] = useState<{ id: string; timestamp: string; numericValue: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const lastDataRef = useRef(data); // Lưu trữ dữ liệu trước đó

  // Hàm fetch API được tối ưu với useCallback
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(API_ENDPOINTS.SENSOR_TEMPERATURE, { params: { limit: 20 } });

      // Chỉ cập nhật state nếu dữ liệu thay đổi
      if (JSON.stringify(lastDataRef.current) !== JSON.stringify(response.data.result)) {
        setData(response.data.result);
        lastDataRef.current = response.data.result;
        console.log("✅ Dữ liệu mới cập nhật!");
      } else {
        console.log("🔄 Dữ liệu không thay đổi, không cập nhật.");
      }

      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Lỗi khi lấy dữ liệu");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchData(); // Gọi API ngay khi component mount

    const intervalId = setInterval(fetchData, 30000); // Giảm số lần gọi API (30s)

    return () => {
      isMounted = false;
      clearInterval(intervalId); // Cleanup interval khi component bị unmount
    };
  }, [fetchData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <Chart data={data} color="#ff7300" title="Temperature Data" />
    </div>
  );
};

export default Temperature;
