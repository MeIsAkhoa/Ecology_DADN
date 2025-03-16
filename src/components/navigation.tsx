import { Link, useLocation } from "react-router-dom";
import { Home, User, Settings, Hourglass, MonitorCog } from "lucide-react";
import { nav_Button } from "./nav-button";
import LogoutButton from "./logout-button";

const Sidebar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="h-screen w-64 bg-gray-900 text-black flex flex-col p-5 bg-white">

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
          <Hourglass className="w-5 h-5" />
          <span>Điều kiện hiện tại</span>
        </Link>

        <Link
          to="/config"
          className={nav_Button({
            variant: location.pathname === "/config" ? "chosen" : "unchosen",
          })}
        >
          <MonitorCog className="w-5 h-5" />
          <span>Điều chỉnh</span>
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

        <Link
          to="/profile"
          className={nav_Button({
            variant: location.pathname === "/profile" ? "chosen" : "unchosen",
          })}
        >
          <User className="w-5 h-5" />
          <span>Thông tin</span>
        </Link>

        <LogoutButton />
      </nav>
    </div>
  );
};

export default Sidebar;
