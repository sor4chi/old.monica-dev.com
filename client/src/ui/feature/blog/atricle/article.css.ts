import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const detail = style({
  display: 'flex',
  gap: '2rem',
});

export const sidebar = style({
  width: '15rem',
  flexShrink: 0,
  display: 'flex',
  gap: '1rem',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      display: 'none',
    },
  },
});

export const sidebarDivider = style({
  margin: 0,
  height: '70vh',
  width: 1,
  border: 'none',
  background: vars.color.bg.secondary,
  position: 'sticky',
  top: `calc(${vars.size.headerHeight} + 1rem)`,
});
