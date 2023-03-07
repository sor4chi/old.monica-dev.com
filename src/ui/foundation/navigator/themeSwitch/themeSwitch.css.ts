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

  '@media': {
    '(hover: hover)': {
      ':hover': {
        opacity: 0.8,
      },
    },
  },
});

export const sun = style({
  color: vars.color.text.primary,
  display: 'none',

  selectors: {
    '.dark &': {
      display: 'block',
    },
  },
});

export const moon = style({
  color: vars.color.text.primary,
  display: 'none',

  selectors: {
    '.light &': {
      display: 'block',
    },
  },
});
