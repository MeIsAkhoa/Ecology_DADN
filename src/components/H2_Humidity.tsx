// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// interface HumidityData {
//   timestamp: string;
//   numericValue: number;
// }

// const HumidityChart: React.FC = () => {
//   const [data, setData] = useState<HumidityData[]>([]);
//   const token = "your-token-here"; // Thay bằng token thực tế

//   useEffect(() => {
//     // Gọi API để lấy dữ liệu độ ẩm đất
//     fetch("http://localhost:8080/adafruit/data/humidity", {
//       method: "GET",
//       headers: {
//         "Authorization": `Bearer ${token}`,
//       }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.code === 200) {
//           const formattedData = data.result.map((item: any) => ({
//             timestamp: item.timestamp,
//             numericValue: item.numericValue,
//           }));
//           setData(formattedData);
//         } else {
//           console.error("Error fetching data:", data.message);
//         }
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, [token]);

//   return (
//     <div className="p-6 bg-[#CDB891] rounded-xl shadow-lg">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Độ ẩm Đất</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" tick={{ fill: "#333" }} />
//           <YAxis tick={{ fill: "#333" }} domain={["auto", "auto"]} unit="%" />
//           <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} />
//           <Line type="monotone" dataKey="numericValue" stroke="#34D399" strokeWidth={2} dot={{ fill: "#34D399" }} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default HumidityChart;


// CODE DƯỚI LÀ TEST GIAO DIỆN VỚI SỐ LIỆU TĨNH
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const sampleData = [
  { timestamp: "2025-03-17T00:06:26.387", numericValue: 41.0 },
  { timestamp: "2025-03-17T00:06:16.312", numericValue: 47.0 },
  { timestamp: "2025-03-17T00:06:06.3", numericValue: 48.0 },
  { timestamp: "2025-03-17T00:05:56.289", numericValue: 44.0 },
  { timestamp: "2025-03-17T00:05:46.282", numericValue: 49.0 },
  { timestamp: "2025-03-17T00:05:36.277", numericValue: 43.0 },
  { timestamp: "2025-03-16T00:00:00", numericValue: 44.0 },
];

const HumidityChart: React.FC = () => {
  return (
    <div className="p-6 bg-[#CDB891] rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Độ ẩm Đất</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tick={{ fill: "#333" }} />
          <YAxis tick={{ fill: "#333" }} domain={["auto", "auto"]} unit="%" />
          <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} />
          <Line type="monotone" dataKey="numericValue" stroke="#000000" strokeWidth={2} dot={{ fill: "#000000" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HumidityChart;
