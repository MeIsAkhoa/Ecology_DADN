import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ToggleDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) return savedMode === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (isMounted) {
      const html = document.documentElement;
      if (isDarkMode) {
        html.classList.add("dark");
        localStorage.setItem("darkMode", "true");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
      }
    }
  }, [isDarkMode, isMounted]);

  if (!isMounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
          ${isDarkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-green-400 hover:bg-green-500"}
          ${isHovered ? "scale-110 shadow-xl" : "scale-100"}`}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      >
        {isDarkMode ? (
          <Moon className="w-5 h-5 text-white" />
        ) : (
          <Sun className="w-5 h-5 text-white" />
        )}
      </button>
      
      {/* Tooltip */}
      <div className={`absolute right-14 bottom-2 bg-gray-800 dark:bg-gray-700 text-white text-xs px-2 py-1 rounded-md transition-opacity duration-300
        ${isHovered ? "opacity-100" : "opacity-0"}`}>
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </div>
    </div>
  );
};

export default ToggleDarkMode;