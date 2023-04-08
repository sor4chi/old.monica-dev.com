import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const BUTTON_BORDER_WIDTH = '0.125rem';

export const button = style({
  borderRadius: '0.5rem',
  fontSize: '1rem',
  lineHeight: '1.25rem',
  cursor: 'pointer',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  boxSizing: 'border-box',
  transition: 'background-color 0.2s ease-in-out, border 0.2s ease-in-out',
  padding: '0.5rem 1rem',

  ':focus-visible': {
    outline: `2px solid ${vars.color.accent.primary}`,
    outlineOffset: '2px',
  },
});

export const variant = styleVariants({
  primary: {
    color: 'white', // fixed for contrast a11y
    backgroundColor: vars.color.accent.primary,
    border: 'none',

    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: vars.color.accent.secondary,
        },
      },
    },
  },
  secondary: {
    color: vars.color.text.primary,
    backgroundColor: vars.color.bg.secondary,
    borderWidth: BUTTON_BORDER_WIDTH,
    borderStyle: 'solid',
    borderColor: vars.color.accent.secondary,

    '@media': {
      '(hover: hover)': {
        ':hover': {
          backgroundColor: vars.color.bg.tertiary,
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
