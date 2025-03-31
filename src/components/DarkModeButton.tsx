import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ToggleDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(isDarkMode));
  }, [isDarkMode]);

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-16 h-8 flex items-center rounded-full transition-all duration-500 shadow-lg overflow-hidden
        ${isDarkMode ? "bg-indigo-900" : "bg-green-300"}
        ${isHovered ? (isDarkMode ? "shadow-indigo-500/30" : "shadow-green-500/30") : ""}`}
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
    >
      {/* Background animation */}
      <div className={`absolute inset-0 transition-opacity duration-500
        ${isDarkMode ? "bg-gradient-to-br from-indigo-900 to-purple-900 opacity-100" : "bg-gradient-to-br from-green-300 to-green-400 opacity-100"}`}></div>
      
      {/* Toggle circle with icon */}
      <div className={`absolute w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-500 flex items-center justify-center
        ${isDarkMode ? "translate-x-9" : "translate-x-1"}
        ${isHovered ? "scale-110" : "scale-100"}`}>
        {isDarkMode ? (
          <Moon className="w-4 h-4 text-indigo-800 transition-all duration-300" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500 transition-all duration-300" />
        )}
      </div>
    </button>
  );
};

export default ToggleDarkMode;