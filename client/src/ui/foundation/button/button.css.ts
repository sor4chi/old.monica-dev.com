import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const BUTTON_BORDER_WIDTH = '0.125rem';

export const button = style({
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
    borderWidth: BUTTON_BORDER_WIDTH,
    borderStyle: 'solid',
    borderColor: vars.color.accent.secondary,

    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: vars.color.accent.primary,
          borderColor: vars.color.accent.primary,
        },
      },
    },
  },
  secondary: {
    color: vars.color.text.primary,
    backgroundColor: vars.color.bg.primary,
    borderWidth: BUTTON_BORDER_WIDTH,
    borderStyle: 'solid',
    borderColor: vars.color.accent.secondary,

    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: vars.color.bg.secondary,
          borderColor: vars.color.accent.primary,
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

export const icon = style({
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
});
