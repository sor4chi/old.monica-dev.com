import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  margin: '0 auto',
  maxWidth: '1024px',
});

export const title = style({
  color: vars.color.text.primary,
  fontSize: '2rem',
  fontWeight: 700,
  margin: '2rem 0',
  textAlign: 'center',
});

export const pageDisplay = style({
  color: vars.color.text.secondary,
  fontWeight: 700,
  textAlign: 'right',
});
