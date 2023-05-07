import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: '1fr auto',
  minHeight: '100dvh',
});

export const main = style({
  width: `min(${vars.breakpoint.pc}, calc(100% - 2rem))`,
  margin: '0 auto',
  marginTop: '4rem',
  padding: '0 1rem',
});
