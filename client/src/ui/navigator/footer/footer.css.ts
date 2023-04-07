import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  background: 'transparent',
  boxSizing: 'border-box',
  width: '100vw',
});

export const divider = style({
  background: vars.color.text.secondary,
  border: 'none',
  height: 1,
  margin: 0,
  opacity: 0.2,
  width: '100vw',
});

export const copywrite = style({
  color: vars.color.text.secondary,
  fontSize: '1rem',
  fontWeight: 400,
  margin: 0,
  padding: '1rem',
  textAlign: 'center',
});
