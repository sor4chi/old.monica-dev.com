import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  position: 'relative',
  width: '100vw',
  height: '100dvh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const title = style({
  textAlign: 'center',
});

export const card = style({
  borderRadius: '0.5rem',
  backgroundColor: vars.color.bg.primary,
  border: `1px solid ${vars.color.bg.secondary}`,
  padding: '1rem',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '24rem',
  overflow: 'hidden',
});
