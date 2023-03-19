import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: `${vars.size.sideMenuWidth} 1fr`,
  minHeight: '100svh',
});

export const sideWrapper = style({
  height: '100%',
});

export const main = style({
  padding: '1rem',
});
