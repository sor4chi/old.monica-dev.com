import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: '1fr auto',
  minHeight: '100svh',
});

export const main = style({
  width: 'min(1024px, calc(100vw - 2rem))',
  margin: '0 auto',
  marginTop: '4rem',
  padding: '0 1rem',
});
