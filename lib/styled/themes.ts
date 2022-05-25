import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./types";

export const commonVariables = {
  headerHeight: "6rem",
  timelineIconContainerSize: "3rem",
  timelineBarWidth: "2px",
  timelineNormalIconSize: "0.5rem",
  timelineSVGIconSize: "3rem",
  timelineIconPositionTop: "0",
};

export const lightTheme: ThemeType = {
  variables: commonVariables,
  colors: {
    text: "#555555",
    subText: "#777777",
    background: "#EDF2F7",
    subBackground: "#fafafa",
    primary: "#4DA8FF",
  },
};

export const darkTheme: ThemeType = {
  variables: commonVariables,
  colors: {
    text: "#DDDDDD",
    subText: "#BBBBBB",
    background: "#292C3E",
    subBackground: "#3B3E51",
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
