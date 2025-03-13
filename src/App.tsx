import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/navigation";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Settings from "./pages/setting";
import Login from "./pages/login";
import "./App.css";
import Config from "./pages/config";
import CurrentData from "./pages/data_page";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/config" element={<Config/>} />
            <Route path="/currentData" element={<CurrentData/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
