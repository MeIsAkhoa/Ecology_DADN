import { useState } from "react";
import api from "../utils/baseURL";

interface UseFetchReturn<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  get: (url: string) => Promise<{ data: T } | undefined>;
  post: (url: string, body: any) => Promise<{ data: T } | undefined>;
  put: (url: string, body: any) => Promise<{ data: T } | undefined>;
  delete: (url: string) => Promise<{ data: T } | undefined>;
}

const useFetch = <T>(): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRequest = async (
    method: string,
    url: string,
    body?: any
  ): Promise<{ data: T } | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const config = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        data: body,
      };

      const response = await api(url, config);
      setData(response.data);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong!");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const get = async (url: string): Promise<{ data: T } | undefined> => {
    return handleRequest("GET", url);
  };

  const post = async (url: string, body: any): Promise<{ data: T } | undefined> => {
    return handleRequest("POST", url, body);
  };

  const put = async (url: string, body: any): Promise<{ data: T } | undefined> => {
    return handleRequest("PUT", url, body);
  };

  const deleteRequest = async (url: string): Promise<{ data: T } | undefined> => {
    return handleRequest("DELETE", url);
  };

  return {
    data,
    error,
    loading,
    get,
    post,
    put,
    delete: deleteRequest,
  };
};

export default useFetch;
