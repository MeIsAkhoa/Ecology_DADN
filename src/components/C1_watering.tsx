import React, { useState, useEffect } from "react";
import api from "../utils/baseURL"; // Import axios instance
import wateringCan from "../assets/watering.png";

const WateringControl: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOn && timeLeft !== null) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer);
            sendWaterPumpCommand(0); // Gửi API tắt khi hết thời gian
            return null;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isOn, timeLeft]);

  const sendWaterPumpCommand = async (value: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/adafruit/control/water-pump", null, {
        params: { value },
      });

      if (response.data.code === 200) {
        console.log(response.data);
        setIsOn(value === 1);
        setTimeLeft(value === 1 ? 10 : null);
      } else {
        setError("Lệnh thất bại, vui lòng thử lại.");
      }
    } catch (err) {
      setError("Không thể kết nối đến máy bơm.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    const newValue = isOn ? 0 : 1;
    sendWaterPumpCommand(newValue);
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <img src={wateringCan} alt="Watering Can" className="w-10 h-10 mr-3" />
          <div>
            <p className="font-bold text-lg">Hệ thống Tưới nước</p>
            <p className="text-gray-700">
              Hệ thống hiện{" "}
              <span className={`font-bold ${isOn ? "text-green-500" : "text-red-500"}`}>
                {isOn ? "ĐANG BẬT" : "ĐANG TẮT"}
              </span>
            </p>
            {isOn && timeLeft !== null && (
              <p className="text-gray-700">
                Thời gian còn lại:{" "}
                <span className="font-bold">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </span>
              </p>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`font-bold px-4 py-2 rounded-lg shadow-md ${
            isOn ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {loading ? "Đang gửi..." : isOn ? "TẮT NGAY" : "BẬT NGAY"}
        </button>
      </div>
    </div>
  );
};

export default WateringControl;
