import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu đã có token
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Chuyển hướng về trang chủ hoặc dashboard
    }
  }, [navigate]);

  return (
     <div >
        <Outlet />
    </div>
  );
};

export default AuthLayout;
