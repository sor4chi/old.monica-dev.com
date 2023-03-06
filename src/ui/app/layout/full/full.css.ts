import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateRows: '1fr auto',
  gridTemplateColumns: '100%',
  minHeight: '100svh',
});

export const main = style({
  paddingTop: '4rem',
});
