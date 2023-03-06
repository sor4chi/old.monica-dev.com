import { createThemeContract } from '@vanilla-extract/css';

export const colorVars = createThemeContract({
  bg: {
    primary: '',
    secondary: '',
  },
  text: {
    primary: '',
    secondary: '',
  },
  accent: {
    primary: '',
    primaryRGB: '',
    secondary: '',
    secondaryRGB: '',
  },
});
