import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const item = style({
  fontSize: '1rem',
  color: vars.color.text.primary,
  textDecoration: 'none',
  transition: 'color 0.2s ease-in-out',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        color: vars.color.text.secondary,
      },
    },
  },
});

export const separator = style({
  fontSize: '1rem',
  color: vars.color.text.tertiary,
});
