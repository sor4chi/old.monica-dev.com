import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  position: 'sticky',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: vars.size.sideMenuWidth,
  height: '100svh',
  top: 0,
  backgroundColor: vars.color.bg.secondary,
});

export const logoContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  fontWeight: 700,
  height: vars.size.headerHeight,
});

export const menu = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  marginTop: '1rem',
});

export const menuItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.5rem',
});
