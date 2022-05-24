import { createGlobalStyle } from "styled-components";
import { ThemeType } from "./types";

const commonVariables = {
  headerHeight: "6rem",
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
    font-family: Roboto Mono,helvetica neue,helvetica,arial,hiragino sans,-apple-system,BlinkMacSystemFont,hiragino kaku gothic pron,noto sans jp,noto sans cjk jp,meiryo,メイリオ,segoe ui,sans-serif;
    /* transition: all 0.2s; */
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
