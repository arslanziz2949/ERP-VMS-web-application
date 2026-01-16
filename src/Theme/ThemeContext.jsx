import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

// Theme colors configuration
export const THEME_COLORS = {
  blue: {
    primary: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    sidebar: '#EAF3F4', // Light sidebar for light theme
    sidebarDark: '#1e293b',
    light: '#dbeafe'
  },
  red: {
    primary: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    sidebar: '#EAF3F4', 
    sidebarDark: '#1e293b',
    light: '#fee2e2'
  },
  orange: {
    primary: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    sidebar: '#EAF3F4', 
    sidebarDark: '#1e293b',
    light: '#ffedd5'
  },
  pink: {
    primary: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    sidebar: '#EAF3F4', 
    sidebarDark: '#1e293b',
    light: '#fce7f3'
  },
  yellow: {
    primary: '#eab308',
    gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
    sidebar: '#EAF3F4', 
    sidebarDark: '#1e293b',
    light: '#fef9c3'
  },
  green: {
    primary: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    sidebar: '#EAF3F4', 
    sidebarDark: '#1e293b',
    light: '#d1fae5'
  },
  purple: {
    primary: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    sidebar: '#EAF3F4',
    sidebarDark: '#1e293b',
    light: '#ede9fe'
  }
};

export const ThemeProvider = ({ children }) => {
  // Initialize from localStorage
  const [mode, setMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme-mode");
    return savedTheme || "light";
  });

  const [color, setColor] = useState(() => {
    const savedColor = localStorage.getItem("theme-color");
    return savedColor || "blue";
  });

  // Save theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("theme-color", color);
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-color", color);

    // Update CSS variables for color
    document.documentElement.style.setProperty('--primary-color', THEME_COLORS[color].primary);
    document.documentElement.style.setProperty('--primary-gradient', THEME_COLORS[color].gradient);
    document.documentElement.style.setProperty('--sidebar-color',
      mode === "light" ? THEME_COLORS[color].sidebar : THEME_COLORS[color].sidebarDark);
    document.documentElement.style.setProperty('--primary-light', THEME_COLORS[color].light);

  }, [mode, color]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (themeMode) => {
    if (themeMode === "light" || themeMode === "dark") {
      setMode(themeMode);
    }
  };

  const setThemeColor = (colorName) => {
    if (THEME_COLORS[colorName]) {
      setColor(colorName);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        color,
        toggleTheme,
        setTheme,
        setThemeColor,
        themeColors: THEME_COLORS
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};