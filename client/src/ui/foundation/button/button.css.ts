import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const button = style({
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  fontSize: '1rem',
  cursor: 'pointer',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  boxSizing: 'border-box',
});

export const variant = styleVariants({
  primary: {
    color: vars.color.text.primary,
    backgroundColor: vars.color.accent.secondary,
    border: 'none',

    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: vars.color.accent.primary,
        },
      },
    },
  },
  secondary: {
    color: vars.color.text.primary,
    backgroundColor: vars.color.bg.primary,
    border: `2px solid ${vars.color.accent.secondary}`,

    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: vars.color.bg.secondary,
        },
      },
    },
  },
});

export const size = styleVariants({
  sm: {
    padding: '0.25rem 0.5rem',
  },
  md: {
    padding: '0.5rem 1rem',
  },
});
