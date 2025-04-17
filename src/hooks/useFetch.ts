import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import api from "../utils/baseURL";

interface UseFetchReturn<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const useFetch = <T,>(
  url: string,
  params?: object,
  interval?: number
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastDataRef = useRef<T | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize params để tránh fetch lại không cần thiết
  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

  const fetchData = useCallback(async () => {
    // Hủy request trước đó nếu có
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    try {
      const response = await api.get<{ code: number; message: string; result: T }>(url, {
        params: memoizedParams,
        signal: abortController.signal,
      });

      if (response.data.code === 200) {
        const newData = response.data.result;

        if (JSON.stringify(lastDataRef.current) !== JSON.stringify(newData)) {
          setData(newData);
          lastDataRef.current = newData;
          console.log("✅ Dữ liệu mới được cập nhật");
        }
        setError(null);
      } else {
        setError(response.data.message || "Lỗi không xác định từ API");
      }
    } catch (err: any) {
      // Chỉ xử lý lỗi nếu không phải do abort
      if (!abortController.signal.aborted) {
        const errorMessage = err.response?.data?.message || 
                           err.message || 
                           "Lỗi khi lấy dữ liệu";
        setError(errorMessage);
        console.error("Fetch error:", errorMessage);
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  }, [url, memoizedParams]);

  // Thêm hàm refresh để có thể gọi thủ công
  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();

    // Thiết lập interval nếu được chỉ định
    if (interval && interval > 0) {
      intervalRef.current = setInterval(fetchData, interval);
    }

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchData, interval]);

  return { data, error, loading, refresh };
};

export default useFetch;