import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const modal = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(2px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animation: `${fadeIn} 0.2s ease-in-out`,
});

export const modalContent = style({
  background: vars.color.bg.primary,
  padding: '2rem',
  borderRadius: '0.5rem',
  width: '100%',
  maxWidth: '50rem',
  maxHeight: '80vh',
  border: `1px solid ${vars.color.bg.tertiary}`,
  boxShadow: vars.color.shadow.md,
  animation: `${fadeIn} 0.2s ease-in-out`,
});

export const modalHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
});

export const modalBody = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const modalFooter = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '2rem',
});

export const modalClose = style({
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  borderRadius: '999px',
  color: vars.color.text.secondary,
  transition: 'background-color 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  width: '2rem',
  height: '2rem',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.tertiary,
      },
    },
  },
});

export const modalTitle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  margin: 0,
});

export const modalCloseIcon = style({
  width: '1.5rem',
  height: '1.5rem',
});
