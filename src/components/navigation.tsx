import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Settings, Menu, X } from "lucide-react";
import { nav_Button } from "./nav-button";

const Sidebar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const [isOpen, setIsOpen] = useState(false); // State để mở/đóng sidebar trên màn hình nhỏ

  return (
    <>
      {/* Nút mở sidebar (hamburger menu) khi màn hình nhỏ hơn md */}
      <button 
        className="md:hidden fixed top-5 left-5 z-50 bg-gray-900 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg p-5 transition-transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0 md:w-64 md:flex md:flex-col`}
      >
        <button 
          className="md:hidden absolute top-5 right-5 bg-gray-900 text-white p-1 rounded"
          onClick={() => setIsOpen(false)}
        >
          <X size={24} />
        </button>

        <nav className="flex flex-col space-y-4">
          <Link
            to="/"
            className={nav_Button({
              variant: location.pathname === "/" ? "chosen" : "unchosen",
            })}
          >
            <Home className="w-5 h-5" />
            <span>Trang chủ</span>
          </Link>

          <Link
            to="/currentData"
            className={nav_Button({
              variant: location.pathname === "/currentData" ? "chosen" : "unchosen",
            })}
          >
            <Settings className="w-5 h-5" />
            <span>Điều kiện hiện tại</span>
          </Link>

          <Link
            to="/config"
            className={nav_Button({
              variant: location.pathname === "/config" ? "chosen" : "unchosen",
            })}
          >
            <Settings className="w-5 h-5" />
            <span>Điều chỉnh</span>
          </Link>

          <Link
            to="/profile"
            className={nav_Button({
              variant: location.pathname === "/profile" ? "chosen" : "unchosen",
            })}
          >
            <User className="w-5 h-5" />
            <span>Thông tin Cá nhân</span>
          </Link>

          <Link
            to="/settings"
            className={nav_Button({
              variant: location.pathname === "/settings" ? "chosen" : "unchosen",
            })}
          >
            <Settings className="w-5 h-5" />
            <span>Cài đặt</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
