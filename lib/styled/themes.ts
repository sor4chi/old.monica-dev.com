import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./types";

export const common = {
  variables: {
    headerHeight: "6rem",
    timelineIconContainerSize: "3rem",
    timelineBarWidth: "0.1rem",
    timelineNormalIconSize: "0.5rem",
    timelineSVGIconSize: "3rem",
    timelineIconPositionTop: "0",
  },
  utils: {
    changeIntensity: (color: string, intensity: number) => {
      const num = parseInt(color.replace("#", ""), 16);
      const changeDegree = intensity + 1;
      let r = (num >> 16) * changeDegree;
      let b = ((num >> 8) & 0x00ff) * changeDegree;
      let g = (num & 0x0000ff) * changeDegree;
      if (r > 255) r = 255;
      if (g > 255) g = 255;
      if (b > 255) b = 255;
      return (
        "#" + (g | (b << 8) | (r << 16)).toString(16).padStart(6, "0")
      ).toUpperCase();
    },
  },
};

export const lightTheme: ThemeType = {
  ...common,
  colors: {
    text: "#555555",
    subText: "#777777",
    background: "#EDF2F7",
    subBackground: "#fafafa",
    subBackgroundAlpha: "#eaeaea",
    primary: "#4DA8FF",
  },
};

export const darkTheme: ThemeType = {
  ...common,
  colors: {
    text: "#DDDDDD",
    subText: "#BBBBBB",
    background: "#292C3E",
    subBackground: "#3B3E51",
    subBackgroundAlpha: "#4B4E61",
    primary: "#9DC4D0",
  },
};

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto Mono', monospace, 'BIZ UDPGothic', sans-serif;;
  }
  
  html, body, #__next {
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;
