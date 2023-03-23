import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  minHeight: '100svh',
  width: '100vw',
});

export const main = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100vw',
  '@media': {
    [`screen and (min-width: ${vars.breakpoint.mobile})`]: {
      height: '100svh',
    },
  },
});
