import React, { useState } from "react";
import Light from "../assets/lightbub.png";

const LightingControl: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg">
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
    </div>
  );
};

export default LightingControl;
