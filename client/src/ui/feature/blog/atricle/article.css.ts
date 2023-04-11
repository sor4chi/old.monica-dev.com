import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const detail = style({
  display: 'flex',
  gap: '2rem',
});

export const sidebar = style({
  width: '15rem',
  flexShrink: 0,

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      display: 'none',
    },
  },
});

export const sidebarInner = style({
  position: 'sticky',
  top: `calc(${vars.size.headerHeight} + 1rem)`,
  height: 'fit-content',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const sidebarDivider = style({
  margin: 0,
  height: '70vh',
  border: 'none',
  borderRight: `1px solid ${vars.color.bg.secondary}`,
  position: 'sticky',
  top: `calc(${vars.size.headerHeight} + 1rem)`,

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      display: 'none',
    },
  },
});
