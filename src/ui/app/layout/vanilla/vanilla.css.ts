import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100vw',
  minHeight: '100svh',
});

export const main = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
});
