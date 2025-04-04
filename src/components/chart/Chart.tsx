import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ChartProps {
  data: { timestamp: string; numericValue: number }[];
  color?: string;
  title: string;
  unit?: string; // Đơn vị (VD: "Độ ẩm", "°C", "lux")
}

const Chart: React.FC<ChartProps> = ({
  data,
  color = "#8884d8",
  title,
  unit = "",
}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(0, 0, 0, 0.1)"
            className="dark:stroke-gray-700"
          />

          {/* Trục X - Hiển thị thời gian đẹp hơn */}
          <XAxis
            dataKey="timestamp"
            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
            stroke="#555"
            className="dark:stroke-gray-400"
          />

          {/* Trục Y - Thêm đơn vị */}
          <YAxis
            stroke="#555"
            className="dark:stroke-gray-400"
            tickFormatter={(value) => `${value}`}
          />

          <Legend />

          {/* Tooltip - Hiển thị như hình bạn gửi */}
          <Tooltip
            formatter={(value: number) => [`${value} ${unit}`, title]} // Hiển thị giá trị + đơn vị
            labelFormatter={(label) => new Date(label).toLocaleString()} // Format thời gian đẹp hơn
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: "8px",
              border: "none",
              color: "#333",
              padding: "10px",
              fontWeight: "bold",
            }}
            wrapperStyle={{
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
            }}
          />

          {/* Đường biểu đồ */}
          <Line
            type="monotone"
            dataKey="numericValue"
            stroke={color}
            strokeWidth={3}
            dot={{ stroke: color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
