import { createThemeContract } from '@vanilla-extract/css';

export const colorVars = createThemeContract({
  bg: {
    primary: '',
    secondary: '',
    tertiary: '',
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
  social: {
    twitter: '',
    github: '',
  },
  error: '',
});
