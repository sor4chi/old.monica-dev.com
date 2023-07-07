import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  position: 'sticky',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: vars.size.sideMenuWidth,
  height: '100dvh',
  top: 0,
  backgroundColor: vars.color.bg.secondary,
  transition: 'background-color 0.2s ease-in-out',
});

export const logoContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  fontWeight: 700,
  fontSize: '1.2rem',
  height: vars.size.headerHeight,
  textDecoration: 'none',
  color: vars.color.text.primary,
});

export const menu = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  margin: '4rem 0',
  width: '100%',
  boxSizing: 'border-box',
});

const baseMenuItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  fontSize: '1.2rem',
  textDecoration: 'none',
  position: 'relative',
  padding: '0.5rem 2rem',
});

export const menuItem = styleVariants({
  active: [
    baseMenuItem,
    {
      color: vars.color.text.primary,

      ':before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        right: 0,
        top: 0,
        width: '0.25rem',
        height: '100%',
        borderRadius: '0.25rem 0 0 0.25rem',
        backgroundColor: vars.color.accent.primary,
      },
    },
  ],
  default: [
    baseMenuItem,
    {
      color: vars.color.text.tertiary,
    },
  ],
});

export const icon = style({
  width: '1.5rem',
  height: '1.5rem',
});

export const footer = style({
  position: 'absolute',
  bottom: '2rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
});
