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

export const input = style({
  width: '100%',
  boxSizing: 'border-box',
  padding: '0.5rem 1rem',
  borderRadius: '0.25rem',
  fontSize: '1rem',
  lineHeight: '1.5',
  color: vars.color.text.primary,
  backgroundColor: vars.color.bg.secondary,
  backgroundClip: 'padding-box',
  transition: 'border 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
  border: `1px solid ${vars.color.bg.tertiary}`,
  outline: 'none',

  ':focus': {
    boxShadow: `0 0 0 0.2rem ${vars.color.accent.primary}`,
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
