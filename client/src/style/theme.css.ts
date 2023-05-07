import { createGlobalTheme } from '@vanilla-extract/css';

import { colorVars } from './contract.css';

createGlobalTheme('.light', colorVars, {
  bg: {
    primary: '#ffffff',
    secondary: '#EDF2F7',
    tertiary: '#dde6f0',
  },
  text: {
    primary: '#1F262D',
    secondary: '#2e343b',
    tertiary: '#4f5b67',
  },
  accent: {
    primary: '#aa9cd8',
    secondary: '#b8aed8',
  },
  social: {
    twitter: '#1da1f2',
    github: '#111111',
    facebook: '#3b5998',
  },
  error: '#e27878',
  success: '#8bae79',
});

createGlobalTheme('.dark', colorVars, {
  bg: {
    primary: '#1F262D',
    secondary: '#2e343b',
    tertiary: '#4f5b67',
  },
  text: {
    primary: '#ffffff',
    secondary: '#EDF2F7',
    tertiary: '#c8d0dd',
  },
  accent: {
    primary: '#859fc2',
    secondary: '#627fa8',
  },
  social: {
    twitter: '#1da1f2',
    github: '#ffffff',
    facebook: '#3b5998',
  },
  error: '#e27878',
  success: '#8bae79',
});

export const vars = {
  color: {
    ...colorVars,
    shadow: {
      sm: '0 0.25rem 0.25rem rgba(31, 38, 45, 0.25)',
      md: '0 0.25rem 0.5rem rgba(31, 38, 45, 0.25)',
      lg: '0 0.25rem 1rem rgba(31, 38, 45, 0.25)',
    },
  },
  size: {
    containerMaxWidth: '64rem',
    headerHeight: '4rem',
    sideMenuWidth: '13rem',
  },
  breakpoint: {
    mobile: '768px',
    pc: '1024px',
  },
};
