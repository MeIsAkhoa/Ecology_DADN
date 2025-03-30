import { useState } from "react";
import api from "../utils/baseURL";

interface UseMutationReturn<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  mutate: (body?: any) => Promise<T | undefined>;
}

type HttpMethod = "POST" | "PUT" | "DELETE";

const useMutation = <T>(method: HttpMethod, url: string): UseMutationReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const mutate = async (body?: any): Promise<T | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        method,
        url,
        data: body,
        headers: { "Content-Type": "application/json" },
      });
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, mutate };
};

export default useMutation;
