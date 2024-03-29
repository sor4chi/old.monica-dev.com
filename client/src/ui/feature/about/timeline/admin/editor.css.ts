import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  gap: '1rem',
});

export const formLeft = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  flex: 1,
});

export const formRight = style({
  width: 'fit-content',
});

export const addIcon = style({
  width: '1.5rem',
  height: '1.5rem',
});
