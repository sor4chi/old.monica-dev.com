import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const button = style({
  padding: '0.25rem',
  borderRadius: '0.25rem',
  fontSize: '1rem',
  color: vars.color.text.primary,
  border: 'none',
  cursor: 'pointer',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  lineHeight: '1.5rem',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, scale 0.2s ease-in-out',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        scale: 1.1,
      },
    },
  },
});

export const buttonAction = style({
  backgroundColor: 'transparent',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.tertiary,
        color: vars.color.text.primary,
      },
    },
  },
});

export const buttonDanger = style({
  backgroundColor: 'transparent',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.error,
        color: '#ffffff',
      },
    },
  },
});
