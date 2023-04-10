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
    primary: '#b8aed8',
    secondary: '#cec6ea',
  },
  social: {
    twitter: '#1da1f2',
    github: '#111111',
    facebook: '#3b5998',
  },
  error: '#e27878',
  success: '#8bae79',
  shadow: {
    sm: '0 0.125rem 0.25rem rgba(31, 38, 45, 0.25)',
    md: '0 0.125rem 0.5rem rgba(31, 38, 45, 0.25)',
    lg: '0 0.125rem 1rem rgba(31, 38, 45, 0.25)',
  },
});

createGlobalTheme('.dark', colorVars, {
  bg: {
    primary: '#1F262D',
    secondary: '#2F3A45',
    tertiary: '#3F5267',
  },
  text: {
    primary: '#EDF2F7',
    secondary: '#cad1df',
    tertiary: '#b2b9c6',
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
  shadow: {
    sm: '0 0.125rem 0.25rem rgba(237, 242, 247, 0.25)',
    md: '0 0.125rem 0.5rem rgba(237, 242, 247, 0.25)',
    lg: '0 0.125rem 1rem rgba(237, 242, 247, 0.25)',
  },
});

export const vars = {
  color: colorVars,
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
