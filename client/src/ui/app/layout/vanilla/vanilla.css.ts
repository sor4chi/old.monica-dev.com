import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const bgImage = style({
  position: 'absolute',
  inset: 0,
  margin: 'auto',
  zIndex: -1,
  objectFit: 'cover',
  opacity: 0,
  width: '100%',
  transition: 'opacity 0.2s ease-in-out',
});

globalStyle(`.dark ${bgImage}`, {
  opacity: 1,
});

export const container = style({
  minHeight: '100dvh',
  width: '100vw',
  backdropFilter: 'blur(100px)',
});

export const main = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  width: '100vw',
  '@media': {
    [`screen and (min-width: ${vars.breakpoint.mobile})`]: {
      height: '100dvh',
    },
  },
});

export const themeSwitchContainer = style({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  zIndex: 1,
});
