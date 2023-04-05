import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  minHeight: '100dvh',
  width: '100vw',
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
