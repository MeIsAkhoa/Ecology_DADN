import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { API_ENDPOINTS } from "../constants/Api";

interface SensorRecord {
  id: string;
  feedName: string;
  timestamp: string;
  numericValue: number;
}

interface HistoryResponse {
  content: SensorRecord[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

const HistoryPage = () => {
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { data, loading, error } = useFetch<HistoryResponse>(
    API_ENDPOINTS.SENSOR_DATA,
    { page, size: pageSize }
  );

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="lg:ml-70 min-h-screen p-4 dark:bg-[#172A46]">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6 border border-gray-200 dark:bg-gray-600">
        <div className="p-3 bg-purple-500 text-white font-medium dark:bg-purple-700 rounded-t-xl">
          📜 Lịch sử dữ liệu cảm biến
        </div>

        <div className="p-4">
          {loading && <p className="text-gray-600 dark:text-white">Đang tải dữ liệu...</p>}
          {error && <p className="text-red-500">Lỗi: {error}</p>}

          {!loading && data && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
                  <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">#</th>
                      <th className="border border-gray-300 px-4 py-2">Tên Feed</th>
                      <th className="border border-gray-300 px-4 py-2">Giá trị</th>
                      <th className="border border-gray-300 px-4 py-2">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.content.map((item, index) => (
                      <tr
                        key={item.id}
                        className="text-center hover:bg-gray-100 dark:hover:bg-gray-500 transition"
                      >
                        <td className="border border-gray-300 px-4 py-2">
                          {index + 1 + page * pageSize}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">{item.feedName}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.numericValue}</td>
                        <td className="border border-gray-300 px-4 py-2">
                          {formatDateTime(item.timestamp)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  disabled={data.first}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition"
                >
                  ◀️ Trang trước
                </button>

                <span className="text-sm text-gray-700 dark:text-white">
                  Trang {data.number + 1} / {data.totalPages}
                </span>

                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={data.last}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition"
                >
                  Trang sau ▶️
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
