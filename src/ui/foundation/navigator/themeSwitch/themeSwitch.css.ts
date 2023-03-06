import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const themeSwitch = style({
  ':hover': {
    opacity: 0.8,
  },
  alignItems: 'center',
  background: vars.color.bg.secondary,
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',

  display: 'flex',
  height: '2rem',

  justifyContent: 'center',

  width: '2rem',
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
