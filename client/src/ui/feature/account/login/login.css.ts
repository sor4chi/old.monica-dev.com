import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  width: '100%',
});

export const error = style({
  color: vars.color.error,
  margin: 0,
});
