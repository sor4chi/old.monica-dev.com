import { createThemeContract } from '@vanilla-extract/css';

export const colorVars = createThemeContract({
  bg: {
    primary: '',
    secondary: '',
  },
  text: {
    primary: '',
    secondary: '',
    tertiary: '',
  },
  accent: {
    primary: '',
    primaryRGB: '',
    secondary: '',
    secondaryRGB: '',
  },
});
