import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const card = style({
  background: vars.color.bg.secondary,
  borderRadius: '0.25rem',
  border: `1px solid ${vars.color.bg.tertiary}`,
  height: '100%',
  boxSizing: 'border-box',
});

export const cardPadding = styleVariants({
  no: {
    padding: 0,
  },
  sm: {
    padding: '0.5rem',
  },
  md: {
    padding: '1rem',
  },
  lg: {
    padding: '1.5rem',
  },
});

export const cardFit = styleVariants({
  fit: {
    width: 'fit-content',
  },
  full: {
    width: '100%',
  },
});
