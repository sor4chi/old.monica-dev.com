import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  width: '100%',
});

export const label = style({
  color: vars.color.text.secondary,
  margin: '0 0 0.5rem',
  display: 'inline-block',
});

export const textarea = style({
  width: '100%',
  boxSizing: 'border-box',
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
    boxShadow: `0 0 0 0.1rem ${vars.color.accent.primary}`,
  },

  '::placeholder': {
    color: vars.color.text.tertiary,
    opacity: 0.5,
  },
});

export const error = style({
  color: vars.color.error,
  margin: '0.5rem 0 0',
});
