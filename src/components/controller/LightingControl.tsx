import React, { useState, useEffect } from "react";
import axios from "../../utils/baseURL"; // Import instance axios có token
import Light from "../../assets/lightbub.png"; // Import icon đèn
import { log } from "console";

const colors = [
  // { name: "Tắt Đèn", value: "off", colorClass: "bg-gray-500", textClass: "text-gray-500" },
  { name: "Đỏ", value: "red", colorClass: "bg-red-500", textClass: "text-red-500" },
  { name: "Xanh Dương", value: "blue", colorClass: "bg-blue-500", textClass: "text-blue-500" },
  { name: "Trắng", value: "white", colorClass: "bg-gray-300", textClass: "text-gray-300" },
  { name: "Xanh Lá", value: "green", colorClass: "bg-green-500", textClass: "text-green-500" },
];

const LightingControl: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>(() => {
    return localStorage.getItem("ledColor") || "off";
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("ledColor", selectedColor);
  }, [selectedColor]);

  const handleColorChange = async (color: string) => {
    setSelectedColor(color);
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/adafruit/control/led", null, {
        params: { value: color },
      });

      if (response.data.code === 200) {
        setMessage(`✅ ${response.data.result}`);
        console.log(response.data);
      } else {
        setMessage("⚠ Lỗi khi gửi lệnh!");
      }
    } catch (error) {
      setMessage("❌ Không thể kết nối đến máy chủ!");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="p-4 bg-gradient-to-l from-green-100 to-green-250 rounded-lg">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <img src={Light} alt="Light" className="w-10 h-10 mr-3" />
          <div>
            <p className="font-bold text-lg">Hệ thống Đèn</p>
            <p className="text-gray-700">
              Màu hiện tại:{" "}
              <span className={`font-bold ${colors.find(c => c.value === selectedColor)?.textClass}`}>
                {colors.find(c => c.value === selectedColor)?.name}
              </span>
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleColorChange(color.value)}
              className={`w-10 h-10 rounded-full border-2 ${
                selectedColor === color.value ? "border-black scale-110" : "border-transparent"
              } ${color.colorClass} transition-transform duration-200`}
              disabled={loading}
            />
          ))}
        </div>
      </div>
      {message && <p className="mt-2 text-sm text-center">{message}</p>}

    </div>
  );
};

export default LightingControl;
