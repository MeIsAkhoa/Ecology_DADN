import useFetch from "../../hooks/useFetch";
import { API_ENDPOINTS } from "../../constants/Api";
import {  Thermometer, Droplets, Sun, Sprout } from "lucide-react";

interface Threshold {
  deviceType: string;
  minValue: number | null;
  maxValue: number | null;
}

const THRESHOLD_CARDS = [
  {
    title: "Nhiệt độ",
    deviceType: "DHT20_TEMPERATURE",
    unit: "°C",
    bgColor: "bg-gradient-to-br from-red-100 to-red-200",
    icon: <Thermometer className="w-8 h-8 text-red-500" />,
    textColor: "text-red-600"
  },
  {
    title: "Độ ẩm không khí",
    deviceType: "DHT20_HUMIDITY",
    unit: "%",
    bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
    icon: <Droplets className="w-8 h-8 text-blue-500" />,
    textColor: "text-blue-600"
  },
  {
    title: "Ánh sáng",
    deviceType: "LIGHT",
    unit: "lux",
    bgColor: "bg-gradient-to-br from-amber-100 to-amber-200",
    icon: <Sun className="w-8 h-8 text-amber-500" />,
    textColor: "text-amber-600"
  },
  {
    title: "Độ ẩm đất",
    deviceType: "SOIL_MOISTURE",
    unit: "%",
    bgColor: "bg-gradient-to-br from-green-100 to-green-200",
    icon: <Sprout className="w-8 h-8 text-green-500" />,
    textColor: "text-green-600"
  },
];

const ThresholdDashboard = () => {
  const { data, error, loading } = useFetch<Threshold[]>(
    API_ENDPOINTS.THRESHOLD_ALL,
    {},
    1000
  );

  const getThreshold = (deviceType: string) => {
    if (!data || !Array.isArray(data)) {
      return { minValue: null, maxValue: null };
    }
    return data.find((item) => item.deviceType === deviceType) || {
      minValue: null,
      maxValue: null,
    };
  };

  if (error) {
    console.error("Error fetching thresholds:", error);
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {THRESHOLD_CARDS.map((card, index) => {
          const threshold = getThreshold(card.deviceType);
          
          return (
            <ThresholdCard
              key={index}
              title={card.title}
              minValue={threshold.minValue}
              maxValue={threshold.maxValue}
              unit={card.unit}
              bgColor={card.bgColor}
              icon={card.icon}
              textColor={card.textColor}
              loading={loading}
            />
          );
        })}
      </div>
    </div>
  );
};

interface ThresholdCardProps {
  title: string;
  minValue: number | null;
  maxValue: number | null;
  unit: string;
  bgColor: string;
  icon: React.ReactNode;
  textColor: string;
  loading: boolean;
}

const ThresholdCard: React.FC<ThresholdCardProps> = ({
  title,
  minValue,
  maxValue,
  unit,
  bgColor,
  icon,
  textColor,
  
}) => {
  const formatValue = (value: number | null) => {
    if (value === null) return <span className="text-gray-500">Chưa đặt</span>;
    return <span className={`font-semibold ${textColor}`}>{value} {unit}</span>;
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-md ${bgColor} transition-all hover:shadow-lg hover:-translate-y-1 border-3 border-gray-200 dark:border-gray-700`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`font-bold text-lg `}>{title}</h3>
        <div className="p-2 rounded-full bg-white/80">
          {icon}
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-600">Ngưỡng tối thiểu:</p>
          <p className="text-lg">
            {formatValue(minValue)}
          </p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Ngưỡng tối đa:</p>
          <p className="text-lg">
            { formatValue(maxValue)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThresholdDashboard;
