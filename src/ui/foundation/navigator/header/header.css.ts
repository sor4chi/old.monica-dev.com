import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const header = style({
  left: 0,
  position: 'fixed',
  top: 0,
  zIndex: 1,
});

export const container = style({
  alignItems: 'center',
  backdropFilter: 'blur(.5rem)',
  background: 'transparent',
  boxSizing: 'border-box',
  display: 'flex',
  gap: '1rem',
  height: vars.size.headerHeight,
  justifyContent: 'space-between',
  margin: '0 auto',
  maxWidth: vars.size.containerMaxWidth,
  padding: '0 1rem',
  width: '100%',
});

export const divider = style({
  background: vars.color.text.secondary,
  border: 'none',
  height: '1px',
  margin: 0,
  opacity: 0.2,
  width: '100vw',
});

export const spacer = style({
  flex: 1,
});

export const navigationList = style({
  alignItems: 'center',
  display: 'flex',
  gap: 20,
  height: '100%',
  justifyContent: 'space-between',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
});

export const navigationListItem = style({
  display: 'inline-block',
});

export const navigationLink = style({
  color: vars.color.text.primary,
  fontSize: '1rem',
  fontWeight: 400,
  textDecoration: 'none',
  transition: 'color .2s ease-in-out',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        color: vars.color.text.secondary,
      },
    },
  },
});
