import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const themeSwitch = style({
  background: vars.color.bg.secondary,
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  height: '2rem',
  width: '2rem',

  padding: 0,

  '@media': {
    '(hover: hover)': {
      ':hover': {
        opacity: 0.8,
      },
    },
  },
});

export const sun = style({
  color: vars.color.accent.primary,
  display: 'none',

  selectors: {
    '.dark &': {
      display: 'block',
      width: '1.25rem',
      height: '1.25rem',
    },
  },
});

export const moon = style({
  color: vars.color.accent.primary,
  display: 'none',

  selectors: {
    '.light &': {
      display: 'block',
      width: '1.25rem',
      height: '1.25rem',
    },
  },
});
