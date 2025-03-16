import React, { useState } from "react";
import DataFile from "../assets/datafile.png";

const SetUpLimit: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
        <img src={DataFile} className="w-10 h-10 mr-3" />
          <div>
            <p className="font-bold text-lg">Đặt Ngưỡng Kích hoạt</p>
          </div>
        </div>
        <button
          onClick={handleToggle}
          className={`font-bold px-4 py-2 rounded-lg shadow-md ${
            isOn ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isOn ? "TẮT NGAY" : "ĐẶT NGAY"}
        </button>
      </div>
    </div>
  );
};

export default SetUpLimit;
