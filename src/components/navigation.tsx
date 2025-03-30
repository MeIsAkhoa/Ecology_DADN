import { useState } from "react";
import {
  Home,
  User,
  Settings,
  Hourglass,
  MonitorCog,
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { NavButton } from "./nav-button";
import LogoutButton from "./logout-button";
import ROUTES from "../constants/routes";
// import { useTheme } from "../context/AuthContext";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <>
      {/* Nút Toggle Sidebar */}
      <button
        className={`fixed top-0 left-0 bg-blue-500 dark:bg-blue-600 text-white p-2 rounded z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        } lg:hidden`}
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-20 left-0 h-full w-full max-w-[18rem] bg-white dark:bg-gray-800 text-black dark:text-white flex flex-col justify-between p-5 shadow-lg transition-transform duration-300
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block`}
      >
        {/* Header với nút đóng và toggle theme */}
        <div className="flex justify-between items-center mb-6">
          {/* <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button> */}
          <button
            className="lg:hidden text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* --- Mục điều hướng chính --- */}
        <nav
          className="flex flex-col space-y-4 h-3/4"
          onClick={() => setIsOpen(false)}
        >
          <NavButton
            to={ROUTES.HOME}
            icon={<Home className="w-6 h-6 mr-1.5" />}
            label="Trang chủ"
          />
          <NavButton
            to={ROUTES.CURRENT_DATA}
            icon={<Hourglass className="w-6 h-6 mr-1.5" />}
            label="Điều kiện hiện tại"
          />
          <NavButton
            to={ROUTES.CONFIG}
            icon={<MonitorCog className="w-6 h-6 mr-1.5" />}
            label="Điều chỉnh"
          />
        </nav>

        {/* --- Mục thông tin & cài đặt --- */}
        <nav className="flex flex-col space-y-4">
          <NavButton
            to={ROUTES.PROFILE}
            icon={<User className="w-6 h-6 mr-1.5" />}
            label="Thông tin"
          />
          <NavButton
            to={ROUTES.SETTINGS}
            icon={<Settings className="w-6 h-6 mr-1.5" />}
            label="Cài đặt"
          />
          {/* --- Đăng xuất --- */}
          <LogoutButton />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
