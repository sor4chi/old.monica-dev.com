import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  width: '100%',
});

export const label = style({
  color: vars.color.text.secondary,
  margin: '0 0 0.5rem',
  display: 'inline-block',
});

const INPUT_HEIGHT = '1.5rem';
const INPUT_VERTICAL_PADDING = '0.5rem';

export const input = style({
  width: '100%',
  boxSizing: 'border-box',
  padding: `${INPUT_VERTICAL_PADDING} 1rem`,
  borderRadius: '0.25rem',
  fontSize: '1rem',
  lineHeight: INPUT_HEIGHT,
  color: vars.color.text.primary,
  backgroundColor: vars.color.bg.secondary,
  backgroundClip: 'padding-box',
  transition: 'border 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out',
  border: `1px solid ${vars.color.bg.tertiary}`,
  outline: 'none',

  ':focus': {
    boxShadow: `0 0 0 0.2rem ${vars.color.accent.primary}`,
  },

  '::placeholder': {
    color: vars.color.text.tertiary,
    opacity: 0.5,
  },
});

export const error = style({
  color: vars.color.error,
  margin: '0.5rem 0 0',
});

export const inputContainer = style({
  position: 'relative',
});

export const icon = style({
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
  width: `calc(${INPUT_HEIGHT} + ${INPUT_VERTICAL_PADDING} * 2)`,
  height: `calc(${INPUT_HEIGHT} + ${INPUT_VERTICAL_PADDING} * 2)`,
  fill: vars.color.text.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
