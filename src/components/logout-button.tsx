import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import {NavButton} from "./nav-button"; // ✅ Import component NavButton đã sửa
import ROUTES from "../constants/routes";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    navigate(ROUTES.LOGIN); // Chuyển hướng về trang đăng nhập
  };

  return (
    <NavButton
      
      icon={<LogOut className="w-6 h-6 mr-1.5 text-red-500" />}
      label="Đăng xuất"
      onClick={handleLogout} // ✅ Truyền sự kiện onClick
    />
  );
};

export default LogoutButton;
