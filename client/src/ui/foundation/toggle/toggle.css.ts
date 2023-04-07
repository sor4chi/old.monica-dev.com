import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

// toggle switch styles
const TOGGLE_CURSOR_SIZE = '1rem';
const TOGGLE_PADDING = '0.25rem';
const TOGGLE_WIDTH = `2.5rem`;

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const label = styleVariants({
  on: {
    color: vars.color.text.primary,
    transition: 'color 0.2s ease-in-out',
  },
  off: {
    color: vars.color.text.tertiary,
    transition: 'color 0.2s ease-in-out',
  },
});

const baseToggle = style({
  width: TOGGLE_WIDTH,
  height: TOGGLE_CURSOR_SIZE,
  borderRadius: '1rem',
  padding: TOGGLE_PADDING,
  position: 'relative',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease-in-out',
});

export const toggle = styleVariants({
  on: [
    baseToggle,
    {
      backgroundColor: vars.color.accent.primary,
    },
  ],
  off: [
    baseToggle,
    {
      backgroundColor: vars.color.bg.secondary,
    },
  ],
});

const baseToggleCursor = style({
  width: TOGGLE_CURSOR_SIZE,
  height: TOGGLE_CURSOR_SIZE,
  borderRadius: '1rem',
  position: 'absolute',
  top: TOGGLE_PADDING,
  transition: 'transform 0.2s ease-in-out',
  backgroundColor: vars.color.bg.primary,
});

export const toggleCursor = styleVariants({
  on: [
    baseToggleCursor,
    {
      transform: `translateX(calc(${TOGGLE_WIDTH} - ${TOGGLE_CURSOR_SIZE}))`,
    },
  ],
  off: [
    baseToggleCursor,
    {
      transform: `translateX(0)`,
    },
  ],
});

export const input = style({
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
});

globalStyle(`${input}:focus + ${baseToggle}`, {
  // boxShadow: `0 0 0 0.2rem ${vars.color.accent.primary}`,
  outline: `2px solid ${vars.color.accent.primary}`,
  outlineOffset: '2px',
});
