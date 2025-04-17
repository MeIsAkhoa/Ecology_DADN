import { FileCog } from "lucide-react";
import React, { useState } from "react";
import useMutation from "../../hooks/useMutation";

interface ThresholdResponse {
  code: number;
  message: string;
  result: string;
}

const LightLimit: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [minLight, setMinLight] = useState<number | null>(null);
  const [maxLight, setMaxLight] = useState<number | null>(null);
  
  // Using the useMutation hook
  const { mutate, error, loading } = useMutation<ThresholdResponse>(
    "POST",
    "threshold/light"
  );

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setMinLight(null);
    setMaxLight(null);
  };

  const handleConfirm = async () => {
    if (
      (minLight === null && maxLight === null) ||
      (minLight !== null &&
        maxLight !== null &&
        minLight >= maxLight)
    ) {
      return;
    }

    try {
      await mutate({
        minValue: minLight,
        maxValue: maxLight,
      });
      
      // Close popup after successful mutation
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 0);
    } catch (err) {
      // Error is already handled by useMutation
      console.error("Error setting threshold:", err);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-green-100 to-green-250 rounded-lg dark:from-green-200 dark:to-green-400">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <FileCog className="w-10 h-10 mr-3" />
          <div>
            <p className="font-bold text-lg">Đặt Ngưỡng Ánh sáng</p>
            <p className="text-sm text-gray-500">
              Thiết lập ngưỡng cho cảm biến Ánh sáng
            </p>
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
        <div className="fixed inset-0 bg-opacity-50 lg:ml-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold text-center mb-4">
              Đặt Ngưỡng Ánh sáng
            </h2>

            {/* Min Light */}
            <div className="mb-4">
              <label className="font-medium text-sm">
                Ánh sáng tối thiểu (Lux)
              </label>
              <input
                type="number"
                placeholder="Nhập Ánh sáng tối thiểu"
                value={minLight ?? ""}
                onChange={(e) =>
                  setMinLight(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="w-full px-3 py-2 border rounded-lg mt-1"
              />
            </div>

            {/* Max Light */}
            <div className="mb-4">
              <label className="font-medium text-sm">
                Ánh sáng tối đa (Lux)
              </label>
              <input
                type="number"
                placeholder="Nhập Ánh sáng tối đa"
                value={maxLight ?? ""}
                onChange={(e) =>
                  setMaxLight(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
                className="w-full px-3 py-2 border rounded-lg mt-1"
              />
            </div>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {loading && (
              <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded-lg text-sm">
                Đang xử lý...
              </div>
            )}

            {/* Confirm & Cancel Buttons */}
            <div className="flex justify-center gap-5 mt-4">
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 w-1/2 text-sm disabled:bg-green-300"
              >
                XÁC NHẬN
              </button>
              <button
                onClick={handleClosePopup}
                disabled={loading}
                className="bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 w-1/2 text-sm disabled:bg-red-300"
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

export default LightLimit;