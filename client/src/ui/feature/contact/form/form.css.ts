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
  gap: '4rem',
  width: '100%',
  maxWidth: '40rem',
  margin: '0 auto',
});

export const successMessageEn = style({
  textAlign: 'center',
  fontSize: '1.25rem',
  fontWeight: 700,
  color: vars.color.text.primary,
});

globalStyle(`${successMessageEn} .twemoji`, {
  width: '1em',
  height: '1em',
  verticalAlign: '-0.1em',
});

export const successMessageAnnotation = style({
  textAlign: 'center',
  fontSize: '1rem',
  color: vars.color.text.secondary,
});

export const backButton = style({
  fontSize: '1rem',
  fontWeight: 300,
  background: 'transparent',
  border: 'none',
  color: vars.color.text.primary,
  cursor: 'pointer',
  padding: '0.5rem 1rem',
  backgroundColor: vars.color.accent.primary,
  borderRadius: '0.25rem',
});

export const twitterLink = style({
  color: vars.color.accent.primary,
});

globalStyle(`${twitterLink} > *`, {
  verticalAlign: 'middle',
});
