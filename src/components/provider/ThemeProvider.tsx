import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
export type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Kiểm tra nếu user đã set darkMode trước đó
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleDarkMode = (): void => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      const theme: ThemeMode = newMode ? "dark" : "light";

      // Lưu lựa chọn vào localStorage
      localStorage.setItem("theme", theme);

      // Thiết lập data-theme attribute
      document.documentElement.setAttribute("data-theme", theme);

      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
