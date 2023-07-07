import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.25rem',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: vars.color.bg.tertiary,
  fontSize: '0.8rem',
  lineHeight: 1.5,
  boxSizing: 'border-box',
  transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
  boxShadow: `0 0 0 0 ${vars.color.bg.tertiary}`,
});

export const checkbox = style({
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
  width: 0,
  height: 0,
});

globalStyle(`${wrapper}:has(${checkbox}:checked)`, {
  backgroundColor: vars.color.bg.secondary,
});

globalStyle(`${wrapper}:has(${checkbox}:focus-visible)`, {
  outline: `2px solid ${vars.color.accent.primary}`,
  outlineOffset: '2px',
});

export const label = style({
  color: vars.color.text.tertiary,
  transition: 'color 0.2s ease-in-out',
  userSelect: 'none',
});

globalStyle(`${checkbox}:checked + ${label}`, {
  color: vars.color.text.primary,
});
