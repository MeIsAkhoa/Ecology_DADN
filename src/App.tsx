import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Settings from "./pages/setting";
import Config from "./pages/config";
import CurrentData from "./pages/data_page";
import Login from "./pages/login";
import Register from "./pages/register";
import "./App.css";
import ROUTES from "./constants/routes";
import Sidebar from "./components/navigation";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="918105208926-vc3sjjcr244asgnu6fvfbqirmjk2fum1.apps.googleusercontent.com">
      <Router>
        <Routes>
          {/* Routes dùng layout chính */}
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.SETTINGS} element={<Settings />} />
            <Route path={ROUTES.CONFIG} element={<Config />} />
            <Route path={ROUTES.CURRENT_DATA} element={<CurrentData />} />
          </Route>

          {/* Routes dùng layout cho Auth */}
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
