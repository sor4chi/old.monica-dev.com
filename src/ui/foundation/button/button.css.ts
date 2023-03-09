import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const button = style({
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  border: 'none',
  fontSize: '1rem',
  color: vars.color.text.primary,
  backgroundColor: vars.color.accent.primary,
  cursor: 'pointer',
  width: 'fit-content',

  ':hover': {
    backgroundColor: vars.color.accent.secondary,
    color: vars.color.text.primary,
  },
});
