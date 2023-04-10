import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  gridRow: '1 / 4',
  gridColumn: '2 / 3',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

export const tags = style({
  display: 'flex',
  alignItems: 'center',
  alignContent: 'flex-start',
  gap: '0.5rem',
  flexWrap: 'wrap',
  height: '10rem',
  overflow: 'auto',
  margin: '0.5rem 0',
  width: '100%',
});

export const label = style({
  color: vars.color.text.secondary,
  width: '100%',
});
