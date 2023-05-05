import { style } from '@vanilla-extract/css';

export const wrapper = style({
  maxWidth: '40rem',
  width: '100%',
  margin: '0 auto',
  padding: '0 1rem',
  boxSizing: 'border-box',
});

export const sorter = style({
  display: 'flex',
  alignItems: 'center',
  alignContent: 'flex-start',
  justifyContent: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
  padding: '0.5rem 0',
});

export const section = style({
  margin: '2rem 0',
});

export const year = style({
  margin: '0 0 .5rem',
  fontWeight: 500,
});
