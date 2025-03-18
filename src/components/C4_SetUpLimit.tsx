import React, { useState } from "react";
import DataFile from "../assets/datafile.png";

const SetUpLimit: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedHumidity, setSelectedHumidity] = useState<number | null>(null);
  const [selectedTemperature, setSelectedTemperature] = useState<number | null>(null);
  const [selectedLight, setSelectedLight] = useState<string | null>(null);
  const [customHumidity, setCustomHumidity] = useState<string>("");
  const [customTemperature, setCustomTemperature] = useState<string>("");

  const humidityLevels = [30, 50, 60, 80, 100];
  const temperatureLevels = [23, 25, 27, 29, 31];
  const lightLevels = ["Rất Sáng", "Sáng", "Sáng Vừa", "Trung Bình", "Tối vừa", "Tối"];

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedHumidity(null);
    setSelectedTemperature(null);
    setSelectedLight(null);
    setCustomHumidity("");
    setCustomTemperature("");
  };

  const handleConfirm = () => {
    console.log("Ngưỡng Kích Hoạt đã chọn:");
    console.log("Độ ẩm:", customHumidity || selectedHumidity || "Không chọn");
    console.log("Nhiệt độ:", customTemperature || selectedTemperature || "Không chọn");
    console.log("Ánh sáng:", selectedLight || "Không chọn");
    setIsPopupOpen(false);
  };

  return (
    <div className="p-4 bg-gradient-to-r from-green-100 to-green-250 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <img src={DataFile} className="w-10 h-10 mr-3" />
          <div>
            <p className="font-bold text-lg">Đặt Ngưỡng Kích hoạt</p>
          </div>
        </div>
        <button
          onClick={handleOpenPopup}
          className="font-bold px-4 py-2 rounded-lg shadow-md bg-green-500 text-white hover:bg-green-600"
        >
          ĐẶT NGAY
        </button>
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-center mb-4">Đặt Ngưỡng Kích Hoạt</h2>

            {/* Độ ẩm */}
            <div className="mb-4">
              <p className="font-medium text-sm">Độ ẩm</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {humidityLevels.map((level) => (
                  <button
                    key={level}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      selectedHumidity === level ? "bg-green-400 text-white" : "bg-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedHumidity(level);
                      setCustomHumidity("");
                    }}
                  >
                    {level}%
                  </button>
                ))}
                <input
                  type="number"
                  min="1"
                  placeholder="Nhập %"
                  value={customHumidity}
                  onChange={(e) => {
                    setCustomHumidity(e.target.value);
                    setSelectedHumidity(null);
                  }}
                  className="px-3 py-1 border rounded-full text-sm text-center w-16"
                />
              </div>
            </div>

            {/* Nhiệt độ */}
            <div className="mb-4">
              <p className="font-medium text-sm">Nhiệt độ</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {temperatureLevels.map((level) => (
                  <button
                    key={level}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      selectedTemperature === level ? "bg-green-400 text-white" : "bg-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedTemperature(level);
                      setCustomTemperature("");
                    }}
                  >
                    {level}°C
                  </button>
                ))}
                <input
                  type="number"
                  min="1"
                  placeholder="Nhập °C"
                  value={customTemperature}
                  onChange={(e) => {
                    setCustomTemperature(e.target.value);
                    setSelectedTemperature(null);
                  }}
                  className="px-3 py-1 border rounded-full text-sm text-center w-16"
                />
              </div>
            </div>

            {/* Ánh sáng */}
            <div className="mb-4">
              <p className="font-medium text-sm">Ánh sáng</p>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {lightLevels.map((level) => (
                  <button
                    key={level}
                    className={`px-3 py-1.5 rounded-full text-sm ${
                      selectedLight === level ? "bg-green-400 text-white" : "bg-gray-300"
                    }`}
                    onClick={() => setSelectedLight(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Nút Xác nhận & Hủy */}
            <div className="flex justify-center gap-5 mt-4">
              <button
                onClick={handleConfirm}
                className="bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 w-1/2 text-sm"
              >
                XÁC NHẬN
              </button>
              <button
                onClick={handleClosePopup}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 w-1/2 text-sm"
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

export default SetUpLimit;
