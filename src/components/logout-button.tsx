import { useNavigate } from "react-router-dom";
import { nav_Button } from "./nav-button";
import { LogOut } from "lucide-react";

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
        <LogOut className="w-6 h-6 mr-1.5 text-red-500" />
        <span className="sm:inline ">Đăng xuất</span>
      </button>
    );
  };
  
  export default LogoutButton;
  