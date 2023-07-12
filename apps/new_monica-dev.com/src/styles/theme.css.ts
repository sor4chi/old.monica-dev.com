import { createGlobalTheme } from '@vanilla-extract/css';

import { colorVars } from './contract.css';

createGlobalTheme('.light', colorVars, {
  gray: {
    1: 'hsl(0 0% 99.0%)',
    2: 'hsl(0 0% 97.3%)',
    3: 'hsl(0 0% 95.1%)',
    4: 'hsl(0 0% 93.0%)',
    5: 'hsl(0 0% 90.9%)',
    6: 'hsl(0 0% 88.7%)',
    7: 'hsl(0 0% 85.8%)',
    8: 'hsl(0 0% 78.0%)',
    9: 'hsl(0 0% 56.1%)',
    10: 'hsl(0 0% 52.3%)',
    11: 'hsl(0 0% 43.5%)',
    12: 'hsl(0 0% 9.0%)',
  },
});

createGlobalTheme('.dark', colorVars, {
  gray: {
    1: 'hsl(0 0% 8.5%)',
    2: 'hsl(0 0% 11.0%)',
    3: 'hsl(0 0% 13.6%)',
    4: 'hsl(0 0% 15.8%)',
    5: 'hsl(0 0% 17.9%)',
    6: 'hsl(0 0% 20.5%)',
    7: 'hsl(0 0% 24.3%)',
    8: 'hsl(0 0% 31.2%)',
    9: 'hsl(0 0% 43.9%)',
    10: 'hsl(0 0% 49.4%)',
    11: 'hsl(0 0% 62.8%)',
    12: 'hsl(0 0% 93.0%)',
  },
});

const fontVars = createGlobalTheme(':root', {
  size: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
});

const spacingVars = createGlobalTheme(':root', {
  absolute: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    4: '1rem',
    6: '1.5rem',
    10: '2.5rem',
    16: '4rem',
  },
  relative: {
    0: '0',
    1: '0.25em',
    2: '0.5em',
    4: '1em',
    6: '1.5em',
    10: '2.5em',
    16: '4em',
  },
});

export const vars = {
  color: colorVars,
  font: fontVars,
  spacing: spacingVars,
};
