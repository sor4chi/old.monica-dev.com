import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  padding: 0,
});

export const noItems = style({
  fontSize: '1.2rem',
  fontWeight: 400,
  margin: '20vh 0',
  color: vars.color.text.secondary,
  textAlign: 'center',
});

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
