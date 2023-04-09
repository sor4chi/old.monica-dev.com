import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const snackbars = style({
  position: 'fixed',
  bottom: '1rem',
  right: '1rem',
  zIndex: 1000,
  pointerEvents: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: '1rem',
});

const slidein = keyframes({
  '0%': {
    transform: 'translateX(100%)',
    opacity: 0,
  },
  '100%': {
    transform: 'translateX(0)',
    opacity: 1,
  },
});

export const snackbar = style({
  padding: '1rem',
  border: `1px solid ${vars.color.bg.tertiary}`,
  backgroundColor: vars.color.bg.secondary,
  borderRadius: '0.25rem',
  boxShadow: vars.color.shadow.md,
  color: vars.color.text.primary,
  pointerEvents: 'auto',
  animation: `${slidein} 0.5s ease-out`,
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const button = style({
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  borderRadius: '999px',
  transition: 'background-color 0.2s ease-in-out',
  padding: 0,

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.tertiary,
        color: vars.color.text.secondary,
      },
    },
  },
});

export const close = style({
  width: '1rem',
  height: '1rem',
  color: vars.color.text.primary,
  padding: '0.5rem',
  display: 'flex',
});
