import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const input = style({
  width: '100%',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '0.25rem',
  fontSize: '1rem',
  lineHeight: '1.5',
  color: vars.color.text.primary,
  backgroundColor: vars.color.bg.secondary,
  backgroundClip: 'padding-box',
  transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',

  ':focus': {
    borderColor: vars.color.accent.primary,
    outline: 'none',
    boxShadow: `0 0 0 0.2rem ${vars.color.accent.primary}`,
  },
});
