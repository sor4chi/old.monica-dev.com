import { createGlobalTheme, createTheme } from '@vanilla-extract/css';

import { colorVars } from './contract.css';

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

createGlobalTheme('.light', colorVars, {
  bg: {
    primary: '#EDF2F7',
    secondary: '#c9d2e1',
  },
  text: {
    primary: '#1F262D',
    secondary: '#2F3A45',
  },
  accent: {
    primary: '#a093c7',
    primaryRGB: '160, 147, 199',
    secondary: '#ada0d3',
    secondaryRGB: '173, 160, 211',
  },
});

createGlobalTheme('.dark', colorVars, {
  bg: {
    primary: '#1F262D',
    secondary: '#2F3A45',
  },
  text: {
    primary: '#EDF2F7',
    secondary: '#c9d2e1',
  },
  accent: {
    primary: '#84a0c6',
    primaryRGB: '132, 160, 198',
    secondary: '#90abd0',
    secondaryRGB: '145, 172, 209',
  },
});

const [commonThemeClass, commonVars] = createTheme({
  size: {
    containerMaxWidth: '64rem',
    headerHeight: '4rem',
  },
});

export const vars = {
  color: colorVars,
  size: commonVars.size,
};

export const themeClass = commonThemeClass;
