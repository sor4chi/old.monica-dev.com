import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  width: '100%',
  maxWidth: '40rem',
  margin: '0 auto',
});

export const success = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
  width: '100%',
  maxWidth: '40rem',
  margin: '0 auto',
});

export const successMessage = style({
  textAlign: 'center',
  fontSize: '1.2rem',
});

globalStyle(`${successMessage} .twemoji`, {
  width: '1em',
  height: '1em',
  verticalAlign: '-0.1em',
});

export const backButton = style({
  fontSize: '1rem',
  fontWeight: 300,
  background: 'transparent',
  border: 'none',
  color: vars.color.accent.primary,
  cursor: 'pointer',
});
