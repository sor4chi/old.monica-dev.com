import { createTheme } from "@vanilla-extract/css";

export const [themeClass, vars] = createTheme({
  color: {
    text: {
      primary: "#1F262D",
      secondary: "#2F3A45",
    },
    textDark: {
      primary: "#ffffff",
      secondary: "#d2d4df",
    },
    bg: {
      primary: "#ffffff",
      secondary: "#f5f5f5",
    },
    bgDark: {
      primary: "#1F262D",
      secondary: "#2F3A45",
    },
    // Black: "#1F262D",
    // Red: "#e27878",
    // Green: "#b4be82",
    // Yellow: "#e2a478",
    // Blue: "#84a0c6",
    // Magenta: "#a093c7",
    // Cyan: "#89b8c2",
    // White: "#c6c8d1",
    // BrightBlack: "#727272",
    // BrightRed: "#e98989",
    // BrightGreen: "#c0ca8f",
    // BrightYellow: "#e9b189",
    // BrightBlue: "#91acd1",
    // BrightMagenta: "#ada0d3",
    // BrightCyan: "#95c4ce",
    // BrightWhite: "#d2d4df",
  },
  size: {
    headerHeight: "4rem",
  },
});
