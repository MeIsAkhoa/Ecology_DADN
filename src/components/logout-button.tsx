import { Link, useNavigate } from "react-router-dom";
import { nav_Button } from "./nav-button";
import { Home, User, Settings, Hourglass, MonitorCog } from "lucide-react";

const LogoutButton = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("token"); // Xóa token
      navigate("/login"); // Chuyển hướng về trang đăng nhập
    };
  
    return (
      <button
        onClick={handleLogout}
        className={nav_Button({
          variant: location.pathname === "/logout" ? "chosen" : "unchosen",
        })}
      >
        <User className="w-5 h-5" />
        <span>Đăng xuất</span>
      </button>
    );
  };
  
  export default LogoutButton;