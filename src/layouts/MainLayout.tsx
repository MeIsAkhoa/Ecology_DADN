import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "../components/navigation";

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu KHÔNG có token
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("login"); // Chuyển hướng về trang login
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
