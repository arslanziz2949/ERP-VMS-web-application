import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../Theme/ThemeContext";
import { MobileMenuButton } from "../Sidebar/Sidebar";
import { useThemeValues } from "../Theme/Theme";
import ColorPicker from "../Theme/ColorPicker";

const titles = {
  "/superAdminDashboard": "Super Admin Dashboard",
  "/adminDashboard": "Admin Dashboard",
  "/createAdmin": "Create Admin",
  "/createSubAdmin": "Create Sub Admin",
  "/projects": "Projects",
};

const Header = ({ isMobile, onToggleSidebar }) => {
  const location = useLocation();
  const { toggleTheme, mode } = useTheme();
  const theme = useThemeValues();

  const title = titles[location.pathname] || "Dashboard";

  return (
    <div
      style={{
        height: "64px",
        background: theme.palette.bg.header,
        borderBottom: `1px solid ${theme.palette.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: theme.palette.shadow,
        transition: "all 0.3s ease",
      }}
    >
      {/* LEFT SIDE: Menu Button + Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {isMobile && (
          <MobileMenuButton 
            onClick={onToggleSidebar} 
            theme={theme}
          />
        )}
        
        <h2
          style={{
            margin: 0,
            whiteSpace: "nowrap",
            color: theme.palette.text.primary,
            ...theme.typography.h2,
          }}
        >
          {title}
        </h2>
      </div>

      {/* RIGHT SIDE: Theme Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Color Picker */}
        <ColorPicker />
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
          style={{
            background: "transparent",
            border: `1px solid ${theme.palette.border}`,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            fontSize: "20px",
            cursor: "pointer",
            color: theme.palette.text.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
            e.currentTarget.style.boxShadow = theme.palette.shadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {mode === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
};

export default Header;