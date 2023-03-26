import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  margin: '2rem 0',
});

export const page = style({
  margin: 0,
  color: vars.color.text.tertiary,
});
