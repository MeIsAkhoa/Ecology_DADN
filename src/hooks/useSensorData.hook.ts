import { useEffect, useRef, useState } from 'react';
import { SensorData, SensorResponse } from '../types/sensor.types';
import useFetch from './useFetch';

export const useSensorData = (endpoint: string, pollingInterval: number = 30000) => {
  const { get } = useFetch<SensorResponse>();
  const [data, setData] = useState<SensorData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const lastDataRef = useRef<string>('');

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await get(endpoint + '?limit=20');
        if (!isMounted) return;

        if (response?.data?.result) {
          // So sánh dữ liệu mới với dữ liệu cũ
          const newDataString = JSON.stringify(response.data.result);
          if (lastDataRef.current !== newDataString) {
            setData(response.data.result);
            lastDataRef.current = newDataString;
            console.log("✅ Dữ liệu mới cập nhật!");
          } else {
            console.log("🔄 Dữ liệu không thay đổi, không cập nhật.");
          }
        }
        setError(null);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || "Lỗi khi lấy dữ liệu");
        console.error("❌ Lỗi khi lấy dữ liệu:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchData();
    const intervalId = setInterval(fetchData, pollingInterval);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [endpoint, get, pollingInterval]);

  return {
    data,
    error,
    loading
  };
}; 