import { Link, useLocation } from "react-router-dom";
import { Home, User, Settings } from "lucide-react";
import { nav_Button } from "./nav-button";

const Sidebar = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  return (
    <div className="h-screen w-64 bg-gray-900 text-black flex flex-col p-5 bg-white">
        {/* <h1 className="text-2xl font-bold">Ecology Dashboard</h1> */}
      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          className={nav_Button({
            variant: location.pathname === "/" ? "chosen" : "unchosen",
          })}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
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
            variant: location.pathname === "/Config" ? "chosen" : "unchosen",
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
          <span>Profile</span>
        </Link>

        <Link
          to="/settings"
          className={nav_Button({
            variant: location.pathname === "/settings" ? "chosen" : "unchosen",
          })}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
