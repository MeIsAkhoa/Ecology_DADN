// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// interface TemperatureData {
//   timestamp: string;
//   numericValue: number;
// }

// const TemperatureChart: React.FC = () => {
//   const [data, setData] = useState<TemperatureData[]>([]);
//   const token = "your-token-here"; // Thay bằng token thực tế

//   useEffect(() => {
//     // Gọi API để lấy dữ liệu nhiệt độ
//     fetch("http://localhost:8080/adafruit/data/temperature", {
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
//     <div className="p-6 bg-blue-100 rounded-xl shadow-lg">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Nhiệt độ</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" tick={{ fill: "#333" }} />
//           <YAxis tick={{ fill: "#333" }} domain={["auto", "auto"]} unit="°C" />
//           <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} />
//           <Line type="monotone" dataKey="numericValue" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TemperatureChart;







// CODE DƯỚI LÀ TEST GIAO DIỆN VỚI SỐ LIỆU TĨNH
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const sampleData = [
  { Time: "00:00", Temperature: 22.5 },
  { Time: "02:00", Temperature: 23.1 },
  { Time: "04:00", Temperature: 24.0 },
  { Time: "06:00", Temperature: 30.3 },
  { Time: "08:00", Temperature: 22.8 },
  { Time: "10:00", Temperature: 23.5 },
  { Time: "12:00", Temperature: 35.0 },
  { Time: "14:00", Temperature: 26.2 },
  { Time: "16:00", Temperature: 25.0 },
  { Time: "18:00", Temperature: 24.5 },
  { Time: "20:00", Temperature: 24.0 },
  { Time: "22:00", Temperature: 24.8 }
];

const TemperatureChart: React.FC = () => {
  return (
    <div className="p-6 bg-blue-100 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Nhiệt độ</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Time" tick={{ fill: "#333" }} />
          <YAxis tick={{ fill: "#333" }} domain={["auto", "auto"]} unit="°C" />
          <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "8px" }} />
          <Line type="monotone" dataKey="Temperature" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
