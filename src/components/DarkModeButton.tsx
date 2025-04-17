import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./provider/ThemeProvider";

const ToggleDarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed z-50 
      bottom-4 right-4  
      md:bottom-6 md:right-6 
      lg:top-10 lg:left-260  
      xl:top-10 xl:left-365
       rounded-full
      transition-all duration-300">
      <button
        onClick={toggleDarkMode}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
          ${
            isDarkMode
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-amber-500 hover:bg-amber-600"
          }
          ${isHovered ? "scale-110 shadow-xl" : "scale-100"}`}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? (
          <Moon className="w-5 h-5 text-white" />
        ) : (
          <Sun className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default ToggleDarkMode;