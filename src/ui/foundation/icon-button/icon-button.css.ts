import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const button = style({
  padding: '0.25rem 0.5rem',
  borderRadius: '0.5rem',
  border: 'none',
  fontSize: '1rem',
  color: vars.color.text.primary,
  backgroundColor: vars.color.accent.secondary,
  cursor: 'pointer',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        opacity: 0.8,
        color: vars.color.text.primary,
      },
    },
  },
});
