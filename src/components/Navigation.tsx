import { useState } from "react";
import {
  Home,
  User,
  Hourglass,
  MonitorCog,
  Menu,
  X,
  Newspaper,
  History,
} from "lucide-react";
import { NavButton } from "./NavButton";
import LogoutButton from "./LogoutButton";
import ROUTES from "../constants/routes-v2";
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

      <aside
        className={`fixed z-40 left-0 top-0 h-full w-70 bg-white dark:bg-gray-800 flex flex-col transition-all duration-300 ease-in-out shadow-xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0
  border-r-0 rounded-r-xl`} // Tắt border-right và chỉ bo góc phải
      >
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent dark:via-gray-600"></div>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-green-500 to-green-700 dark:from-green-400 dark:to-green-600">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent tracking-tight">
              EcologyDash
            </h1>
          </div>
          <button
            className="lg:hidden p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 ">
          <div className="flex justify-center">
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
            to={ROUTES.HISTORY}
            icon={<History className="w-5 h-5" />}
            label="Lịch sử"
          />
          <NavButton
            to={ROUTES.CONFIG}
            icon={<MonitorCog className="w-5 h-5" />}
            label="Điều chỉnh"
          />

          <NavButton
            to={ROUTES.NEWS}
            icon={<Newspaper className="w-5 h-5" />}
            label="Tin tức"
          />
        </nav>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <NavButton
            to={ROUTES.PROFILE}
            icon={<User className="w-5 h-5" />}
            label="Thông tin"
          />

          {/* <NavButton
            to={ROUTES.SETTINGS}
            icon={<Settings className="w-5 h-5" />}
            label="Cài đặt"
          /> */}

          <LogoutButton />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
