import { style } from '@vanilla-extract/css';

export const container = style({
  minHeight: '100svh',
  width: '100vw',
});

export const main = style({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  width: '100vw',
});
