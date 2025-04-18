import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { NavButton } from "./NavButton";
import ROUTES from "../constants/Routes";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken"); // Giả sử bạn lưu refreshToken trong localStorage

      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          refreshToken: refreshToken,
        }),
      });

      const data = await response.json();

      if (data.code === 200) {
        localStorage.removeItem("token"); // Xóa token
        localStorage.removeItem("refreshToken"); // Xóa refreshToken nếu có
        navigate(ROUTES.LOGIN); // Chuyển hướng về trang đăng nhập
      } else {
        console.error("Logout failed:", data);
        // Có thể thêm thông báo lỗi cho người dùng nếu cần
      }
    } catch (error) {
      console.error("Error during logout:", error);
      // Có thể thêm thông báo lỗi cho người dùng nếu cần
    }
  };

  return (
    <NavButton
      icon={<LogOut className="w-5 h-5 text-red-500" />}
      label="Đăng xuất"
      onClick={handleLogout}
    />
  );
};

export default LogoutButton;