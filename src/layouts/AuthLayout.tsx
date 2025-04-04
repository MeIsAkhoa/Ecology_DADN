import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import ROUTES from "../constants/Routes";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu đã có token
    const token = localStorage.getItem("token");
    if (token) {
      navigate(ROUTES.HOME); // Chuyển hướng về trang chủ hoặc dashboard
    }
  }, [navigate]);

  return (
     <div >
        <Outlet />
    </div>
  );
};

export default AuthLayout;