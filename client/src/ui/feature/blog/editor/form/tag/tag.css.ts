import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  gridRow: '1 / 4',
  gridColumn: '2 / 3',
});

export const tags = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  flexWrap: 'wrap',
  height: '12rem',
  overflow: 'auto',
  padding: '0.5rem',
});

export const label = style({
  color: vars.color.text.secondary,
  display: 'inline-block',
});
