import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const bgImage = style({
  position: 'absolute',
  top: vars.size.headerHeight,
  left: 0,
  right: 0,
  margin: 'auto',
  zIndex: -1,
  objectFit: 'cover',
  opacity: 1,
  width: '100%',
  transition: 'opacity 0.2s ease-in-out',
});

globalStyle(`.light ${bgImage}`, {
  opacity: 0,
});

export const wrapper = style({
  display: 'grid',
  gridTemplateColumns: '100%',
  gridTemplateRows: '1fr auto',
  minHeight: '100dvh',
  backdropFilter: 'blur(100px)',
});

export const main = style({
  width: `min(${vars.breakpoint.pc}, calc(100% - 2rem))`,
  margin: '0 auto',
  marginTop: '4rem',
  padding: '0 1rem',
});
