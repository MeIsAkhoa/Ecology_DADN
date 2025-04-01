import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import {NavButton} from "./NavButton"; // ✅ Import component NavButton đã sửa
import ROUTES from "../constants/Routes";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Xóa token
    navigate(ROUTES.LOGIN); // Chuyển hướng về trang đăng nhập
  };

  return (
    <NavButton
      
      icon={<LogOut className="w-5 h-5  text-red-500" />}
      label="Đăng xuất"
      onClick={handleLogout} // ✅ Truyền sự kiện onClick
    />
  );
};

export default LogoutButton;
