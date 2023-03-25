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

  '@media': {
    '(hover: hover)': {
      ':hover': {
        opacity: 0.8,
        color: vars.color.text.primary,
      },
    },
  },
});

export const variant = styleVariants({
  primary: {
    color: vars.color.text.primary,
    backgroundColor: vars.color.accent.secondary,
    border: 'none',
  },
  secondary: {
    color: vars.color.text.primary,
    backgroundColor: 'transparent',
    border: `2px solid ${vars.color.accent.secondary}`,
  },
});
