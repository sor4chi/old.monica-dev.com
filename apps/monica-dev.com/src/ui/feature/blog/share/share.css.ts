import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const shares = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1.25rem',
});

export const social = style({
  opacity: 1,
  padding: '0.5rem',
  background: 'transparent',
  transition: 'opacity 0.2s ease-in-out, background 0.2s ease-in-out',
  borderRadius: '999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  boxSizing: 'border-box',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        opacity: 0.8,
        background: vars.color.bg.secondary,
      },
    },
  },
});

globalStyle(`${shares} svg`, {
  display: 'block',
});

export const editLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '1rem',
  textDecoration: 'none',
  color: vars.color.accent.primary,

  '@media': {
    '(hover: hover)': {
      ':hover': {
        textDecoration: 'underline',
      },
    },
  },
});

export const icon = style({
  width: '1rem',
  height: '1rem',
});
