import { useState, useEffect, useRef, useCallback } from "react";
import api from "../utils/baseURL";

interface UseFetchReturn<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const useFetch = <T>(
  url: string, 
  params?: object, 
  interval?: number 
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const lastDataRef = useRef<T | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<T>(url, { params });

      // Chỉ cập nhật nếu dữ liệu thay đổi
      if (JSON.stringify(lastDataRef.current) !== JSON.stringify(response.data)) {
        setData(response.data);
        lastDataRef.current = response.data;
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
  }, [url, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();

    if (interval && interval > 0) {
      const intervalId = setInterval(fetchData, interval);
      return () => clearInterval(intervalId);
    }
  }, [fetchData, interval]);

  return { data, error, loading};
};

export default useFetch;
