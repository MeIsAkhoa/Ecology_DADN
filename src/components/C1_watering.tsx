import React, { useState, useEffect } from "react";
import wateringCan from "../assets/watering.png";

const WateringControl: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOn && timeLeft !== null) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev !== null && prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer);
            setIsOn(false);
            return null;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOn, timeLeft]);

  const handleToggle = () => {
    if (isOn) {
      setIsOn(false);
      setTimeLeft(null);
    } else {
      setIsOn(true);
      setTimeLeft(10);
    }
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
        <img src={wateringCan} alt="Watering Can" className="w-10 h-10 mr-3" />
          <div>
            <p className="font-bold text-lg">Hệ thống Tưới nước</p>
            <p className="text-gray-700">
              Hệ thống Tưới nước hiện{" "}
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
          </div>
        </div>
        <button
          onClick={handleToggle}
          className={`font-bold px-4 py-2 rounded-lg shadow-md ${
            isOn ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isOn ? "TẮT NGAY" : "BẬT NGAY"}
        </button>
      </div>
    </div>
  );
};

export default WateringControl;
