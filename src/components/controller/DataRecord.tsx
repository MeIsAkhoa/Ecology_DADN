import { FileCog } from "lucide-react";
import React, { useState } from "react";


const DataRecord: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [customTime, setCustomTime] = useState<string>("");

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTime(null);
    setCustomTime("");
  };

  const handleConfirm = () => {
    const finalTime = customTime ? parseInt(customTime) : selectedTime;
    console.log("Chu kỳ thu thập dữ liệu:", finalTime, "tiếng");
    setIsPopupOpen(false);
  };

  return (
    <div className="p-4 bg-gradient-to-r from-green-100 to-green-250 rounded-lg dark:from-green-200 dark:to-green-400">
      {/* ĐẶT NGAY */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
        <FileCog className="w-10 h-10 mr-3"/>
         
          <div>
            <p className="font-bold text-lg">Đặt Chu kỳ Thu thập Dữ liệu</p>
          </div>
        </div>
        <button
          onClick={handleOpenPopup}
          className="font-bold px-4 py-2 rounded-lg shadow-md bg-green-500 text-white hover:bg-green-600"
        >
          ĐẶT NGAY
        </button>
      </div>

      {/* POPUP */}
      {isPopupOpen && (
        <div className="absolute top-1/2 left-3/5 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center mb-4">Đặt Chu kỳ Thu thập Dữ liệu</h2>

            {/* Lựa chọn thời gian */}
            <div className="grid grid-cols-3 gap-2 mb-4">
            {[3, 6, 12, 24, 48, 72].map((time) => (
                <button
                key={time}
                className={`px-4 py-2 rounded-2xl text-black ${
                    selectedTime === time ? "bg-green-400 text-white" : "bg-gray-300"
                }`}
                onClick={() => {
                    setSelectedTime(time);
                    setCustomTime("");
                }}
                >
                {time} tiếng
                </button>
            ))}
            </div>

            {/* Input thời gian tuỳ chỉnh */}
            <div className="mb-4">
            <label className="block text-gray-700 font-medium">Thời gian tùy chỉnh:</label>
            <input
                type="number"
                min="1"
                placeholder="Nhập số giờ"
                value={customTime}
                onChange={(e) => {
                setCustomTime(e.target.value);
                setSelectedTime(null);
                }}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
            </div>

            {/* Nút Xác nhận & Hủy */}
            <div className="flex justify-center gap-5">
            <button
                onClick={handleConfirm}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-1/2"
            >
                XÁC NHẬN
            </button>
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

export default DataRecord;



