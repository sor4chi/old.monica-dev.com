import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  display: 'flex',
  gap: '1rem',
  width: '100%',
  justifyContent: 'center',
  margin: '2rem 0',
});

export const link = style({
  textDecoration: 'none',
  fontWeight: 700,
});

export const linkState = styleVariants({
  active: {
    color: vars.color.accent.primary,
  },
  inactive: {
    color: vars.color.text.primary,
  },
});

export const dots = style({
  display: 'flex',
  gap: '0.1rem',
  alignItems: 'center',
  justifyContent: 'space-around',
});

export const dot = style({
  width: '0.25rem',
  height: '0.25rem',
  borderRadius: '50%',
  background: vars.color.text.secondary,
});
