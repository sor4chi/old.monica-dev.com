import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: '1fr auto',
  minHeight: '100svh',
});

export const main = style({
  maxWidth: '1024px',
  margin: '0 auto',
  marginTop: '4rem',
  padding: '0 1rem',
});
