import { useTheme } from "./ThemeContext";
import { THEME_COLORS } from "./ThemeContext";

const generateTheme = (mode, color) => {
  const colorConfig = THEME_COLORS[color] || THEME_COLORS.blue;

  if (mode === "light") {
    return {
      palette: {
        bg: {
          body: "#f8fafc",
          header: "#EAF3F4",
          card: "#EAF3F4",
          cardGradient: colorConfig.gradient,
          sidebar: colorConfig.sidebar, // This will now use the light sidebar color
          sidebarHover: `rgba(96, 165, 250, 0.2)`, // Added hover color for light theme
        },
        text: {
          primary: "#0f172a",
          secondary: "#475569",
          muted: "#64748b",
          onCard: "#ffffff",
          sidebar: "#475569", // Dark text for light sidebar
          sidebarActive: "#0f172a",
        },
        primary: colorConfig.primary,
        primaryLight: colorConfig.light,
        border: "#e2e8f0",
        shadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        shadowLg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      typography: {
        h1: {
          fontSize: "32px",
          fontWeight: 700,
        },
        h2: {
          fontSize: "24px",
          fontWeight: 600,
        },
        h3: {
          fontSize: "20px",
          fontWeight: 600,
        },
        p: {
          fontSize: "14px",
          lineHeight: "1.6",
        },
      },
    };
  } else {
    return {
      palette: {
        bg: {
          body: "#0f172a",
          header: "#1e293b",
          card: "#1e293b",
          cardGradient: colorConfig.gradient,
          sidebar: colorConfig.sidebarDark, // Use dark sidebar for dark theme
          sidebarHover: `rgba(255, 255, 255, 0.15)`,
        },
        text: {
          primary: "#f8fafc",
          secondary: "#cbd5e1",
          muted: "#94a3b8",
          onCard: "#e5f2ff",
          sidebar: "#cbd5e1",
          sidebarActive: "#ffffff",
        },
        primary: colorConfig.primary,
        primaryLight: colorConfig.light,
        border: "rgba(255, 255, 255, 0.15)",
        shadow: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",
        shadowLg: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
      },
      typography: {
        h1: {
          fontSize: "32px",
          fontWeight: 700,
        },
        h2: {
          fontSize: "24px",
          fontWeight: 600,
        },
        h3: {
          fontSize: "20px",
          fontWeight: 600,
        },
        p: {
          fontSize: "14px",
          lineHeight: "1.6",
        },
      },
    };
  }
};

// Helper hook to get theme values
export const useThemeValues = () => {
  const { mode, color } = useTheme();
  return generateTheme(mode, color);
};

// Export for testing
export default generateTheme;