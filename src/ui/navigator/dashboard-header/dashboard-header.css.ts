import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const header = style({
  left: 0,
  position: 'sticky',
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
  justifyContent: 'space-between',
  width: '100%',
  padding: `0 2rem`,
});

export const divider = style({
  background: vars.color.text.secondary,
  border: 'none',
  height: '1px',
  margin: 0,
  opacity: 0.2,
});
