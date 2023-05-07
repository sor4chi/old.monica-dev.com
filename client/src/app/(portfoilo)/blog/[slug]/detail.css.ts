import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const detail = style({
  display: 'flex',
  gap: '1rem',
});

export const sidebar = style({
  width: '18rem',
  flexShrink: 0,
  display: 'flex',
  gap: '1rem',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      display: 'none',
    },
  },
});

const stickyComposite = style({
  position: 'sticky',
  top: `calc(${vars.size.headerHeight} + 1rem)`,
  height: 'fit-content',
});

export const dividerContainer = style([
  stickyComposite,
  {
    height: '70vh',
  },
]);

export const itemContainer = style([
  stickyComposite,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
]);
