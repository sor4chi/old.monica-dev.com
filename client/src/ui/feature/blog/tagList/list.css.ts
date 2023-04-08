import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  display: 'flex',
  gap: '0.25rem 1rem',
  padding: 0,
  margin: 0,
  flexWrap: 'wrap',
});

export const item = style({
  display: 'inline',
  listStyle: 'none',
  lineHeight: 1,
});

export const link = style({
  textDecoration: 'none',
  color: vars.color.accent.primary,
  fontWeight: 700,
  whiteSpace: 'nowrap',
  verticalAlign: 'sub',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        textDecoration: 'underline',
      },
    },
  },
});
