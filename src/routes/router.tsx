import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Profile from "../pages/profile";
import Settings from "../pages/setting";
import Login from "../pages/login";
import Register from "../pages/register";
import Config from "../pages/config";
import CurrentData from "../pages/data_page";

import AuthLayout from "../layouts/AuthLayout.tsx";
import MainLayout from "../layouts/MainLayout.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Main Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/config" element={<Config />} />
        <Route path="/currentData" element={<CurrentData />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
