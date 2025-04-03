import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Navigation";
import ROUTES from "../constants/Routes";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu KHÔNG có token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate(ROUTES.LOGIN); // Chuyển hướng về trang login
    }
  }, [navigate]);

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 dark:bg-[#172A46]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
