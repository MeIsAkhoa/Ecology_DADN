import React, { useState } from "react";
import Light from "../assets/lightbub.png";

// Hàm để gửi yêu cầu API điều khiển đèn LED
const controlLED = async (color: string, token: string) => {
  const response = await fetch("http://localhost:8080/adafruit/control/led", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Token cần được gửi đi
    },
    body: JSON.stringify({ value: color }),
  });

  const result = await response.json();
  if (result.code === 200) {
    console.log("LED color changed successfully!");
  } else {
    console.error("Failed to change LED color:", result.message);
  }
};

const LightingControl: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>("");

  const token = localStorage.getItem("token") || "";

  const handleToggle = () => {
    setIsOn((prev) => !prev);
    if (!isOn) {
      setIsPopupOpen(true); // Mở pop-up khi bật đèn
    }
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setIsPopupOpen(false); // Đóng popup khi chọn màu
    controlLED(color, token); // Gửi yêu cầu API khi chọn màu
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Đóng pop-up nếu nhấn huỷ
  };

  return (
    <div className="p-4 bg-gradient-to-l from-green-100 to-green-250 rounded-lg">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <img src={Light} alt="Light" className="w-10 h-10 mr-3" />
          <div>
            <p className="font-bold text-lg">Hệ thống Đèn</p>
            <p className="text-gray-700">
              Hệ thống Đèn hiện{" "}
              <span className={`font-bold ${isOn ? "text-green-500" : "text-red-500"}`}>
                {isOn ? "ĐANG BẬT" : "ĐANG TẮT"}
              </span>
            </p>
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

      {/* POPUP */}
      {isPopupOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Chọn màu đèn</h2>

            {/* Lựa chọn màu */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {["red", "green", "blue", "white"].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  className={`px-4 py-2 rounded-2xl border-2 text-black ${
                    selectedColor === color 
                      ? "border-blue-400" 
                      : color === "white" 
                      ? "border-black"
                      : `border-${color}-500`
                  }`}
                  style={{ borderColor: color === "white" ? "black" : color }}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </button>
              ))}
            </div>

            {/* Nút Hủy */}
            <div className="flex justify-center">
              <button
                onClick={handleClosePopup}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-1/2"
              >
                HUỶ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LightingControl;
