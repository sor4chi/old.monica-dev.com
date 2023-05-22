import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const twemoji = style({
  display: 'inline-block',
  width: '1.5rem',
  height: '1.5rem',
});

export const imageContainer = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  margin: '1rem auto',
  display: 'flex',
});

export const image = style({
  objectFit: 'contain',
  borderRadius: '0.5rem',
  overflow: 'hidden',
  boxSizing: 'border-box',
  cursor: 'pointer',
  filter: `drop-shadow(${vars.color.shadow.sm})`,
});

export const expanded = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100dvh',
  padding: '1rem',
  boxSizing: 'border-box',
  zIndex: 100,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  backdropFilter: 'blur(5px)',
  overflow: 'hidden',
});

export const close = style({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  cursor: 'pointer',
  color: 'white',
  fontSize: '1.5rem',
});

export const closeIcon = style({
  width: '1.5rem',
  height: '1.5rem',
});

export const expandedImageContainer = style({
  width: '100%',
  margin: '1rem',
  boxSizing: 'border-box',
  position: 'relative',
});

export const expandedImage = style({
  width: '100%',
  maxWidth: '64rem',
  height: 'auto',
  objectFit: 'contain',
  maxHeight: 'calc(100dvh - 2rem)',
  textAlign: 'center',
  boxShadow: vars.color.shadow.lg,
});
