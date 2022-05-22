import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./types";

export const lightTheme: ThemeType = {
  colors: {
    text: "#000",
    background: "#EDF2F7",
    subBackground: "#fafafa",
    primary: "#4DA8FF",
  },
};

export const darkTheme: ThemeType = {
  colors: {
    text: "#DDDDDD",
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
  }
  
  html, body, #__next {
    height: 100%;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;
