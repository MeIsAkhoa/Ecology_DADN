import { useState } from "react";
import { Home, User, Settings, Hourglass, MonitorCog, Menu, X } from "lucide-react";
import { NavButton } from "./NavButton";
import LogoutButton from "./LogoutButton";
import ROUTES from "../constants/Routes";
import ToggleDarkMode from "./DarkModeButton";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className={`fixed top-4 left-4 z-40 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        } lg:hidden`}
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">WeatherApp</h1>
          <button
            className="sm:hidden p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="mb-6 flex justify-center">
            <ToggleDarkMode />
          </div>
          
          <NavButton
            to={ROUTES.HOME}
            icon={<Home className="w-5 h-5" />}
            label="Trang chủ"
          />
          
          <NavButton
            to={ROUTES.CURRENT_DATA}
            icon={<Hourglass className="w-5 h-5" />}
            label="Điều kiện hiện tại"
          />
          
          <NavButton
            to={ROUTES.CONFIG}
            icon={<MonitorCog className="w-5 h-5" />}
            label="Điều chỉnh"
          />
        </nav>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <NavButton
            to={ROUTES.PROFILE}
            icon={<User className="w-5 h-5" />}
            label="Thông tin"
          />
          
          <NavButton
            to={ROUTES.SETTINGS}
            icon={<Settings className="w-5 h-5" />}
            label="Cài đặt"
          />
          
          <LogoutButton />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;