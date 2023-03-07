import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  display: 'flex',
  gap: '1rem',
  padding: 0,
});

export const item = style({
  listStyle: 'none',
});

export const link = style({
  textDecoration: 'none',
  color: vars.color.accent.primary,
  fontWeight: 700,
});
