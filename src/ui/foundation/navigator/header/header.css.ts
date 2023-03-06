import { vars } from '@/style/theme.css';
import { style } from '@vanilla-extract/css';

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1,
});

export const container = style({
  width: '100%',
  maxWidth: vars.size.containerMaxWidth,
  height: vars.size.headerHeight,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem',
  padding: '0 1rem',
  margin: '0 auto',
  boxSizing: 'border-box',
  background: 'transparent',
  backdropFilter: 'blur(.5rem)',
});

export const divider = style({
  width: '100vw',
  height: '1px',
  background: vars.color.text.secondary,
  opacity: 0.2,
  margin: 0,
  border: 'none',
});

export const logo = style({
  transition: 'rotate .5s ease-out',

  selectors: {
    '.dark &': {
      rotate: '0deg',
    },
    '.light &': {
      rotate: '180deg',
    },
  },
});

export const spacer = style({
  flex: 1,
});

export const navigationList = style({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 20,
  height: '100%',
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
  ':hover': {
    color: vars.color.text.secondary,
  },
});
