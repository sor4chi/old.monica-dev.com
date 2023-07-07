import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

// toggle switch styles
const TOGGLE_CURSOR_SIZE = '1rem';
const TOGGLE_PADDING = '0.25rem';
const TOGGLE_WIDTH = `2.5rem`;

export const toggleWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
});

export const label = style({
  transition: 'color 0.2s ease-in-out',
  color: vars.color.text.tertiary,
});

export const toggle = style({
  width: TOGGLE_WIDTH,
  height: TOGGLE_CURSOR_SIZE,
  borderRadius: '1rem',
  padding: TOGGLE_PADDING,
  position: 'relative',
  backgroundColor: vars.color.bg.tertiary,
  transition: 'background-color 0.2s ease-in-out',
});

export const toggleCursor = style({
  width: TOGGLE_CURSOR_SIZE,
  height: TOGGLE_CURSOR_SIZE,
  borderRadius: '1rem',
  position: 'absolute',
  top: TOGGLE_PADDING,
  transform: `translateX(0)`,
  transition: 'transform 0.2s ease-in-out',
  backgroundColor: vars.color.bg.primary,
});

export const input = style({
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
});

globalStyle(`${input}:focus-visible + ${toggleWrapper} > ${toggle}`, {
  // boxShadow: `0 0 0 0.2rem ${vars.color.accent.primary}`,
  outline: `2px solid ${vars.color.accent.primary}`,
  outlineOffset: '2px',
});

globalStyle(`${input}:checked + ${toggleWrapper} > ${toggle}`, {
  backgroundColor: vars.color.accent.primary,
});

globalStyle(`${input}:checked + ${toggleWrapper} > ${label}`, {
  color: vars.color.text.primary,
});

globalStyle(`${input}:checked + ${toggleWrapper} ${toggleCursor}`, {
  transform: `translateX(calc(${TOGGLE_WIDTH} - ${TOGGLE_CURSOR_SIZE}))`,
});
