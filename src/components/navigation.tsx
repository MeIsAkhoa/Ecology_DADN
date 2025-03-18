import { Home, User, Settings, Hourglass, MonitorCog } from "lucide-react";
import { NavButtonUnchosen } from "./nav-button";
import LogoutButton from "./logout-button";
import ROUTES from "../constants/routes";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white text-black flex flex-col justify-between p-5 shadow-lg md:w-20 lg:w-64 transition-all duration-300">
      {/* --- Mục điều hướng chính --- */}
      <nav className="mt-6 flex flex-col space-y-4">
        <NavButtonUnchosen to={ROUTES.HOME} icon={<Home className="w-6 h-6 mr-1.5" />} label="Trang chủ" />
        <NavButtonUnchosen to={ROUTES.CURRENT_DATA} icon={<Hourglass className="w-6 h-6 mr-1.5" />} label="Điều kiện hiện tại" />
        <NavButtonUnchosen to={ROUTES.CONFIG} icon={<MonitorCog className="w-6 h-6 mr-1.5" />} label="Điều chỉnh" />
      </nav>
      {/* --- Mục thông tin & cài đặt --- */}
      <div className="flex flex-col space-y-4">
        <NavButtonUnchosen to={ROUTES.PROFILE} icon={<User className="w-6 h-6 mr-1.5" />} label="Thông tin" />
        <NavButtonUnchosen to={ROUTES.SETTINGS} icon={<Settings className="w-6 h-6 mr-1.5" />} label="Cài đặt" />
        {/* --- Đăng xuất --- */}
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
