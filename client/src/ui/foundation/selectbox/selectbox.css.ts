import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const wrapper = style({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
});

export const options = style({
  position: 'absolute',
  top: 'calc(100% + 0.5rem)',
  left: 0,
  width: '100%',
  maxHeight: '30vh',
  zIndex: 1,
  backgroundColor: vars.color.bg.secondary,
  boxShadow: `0 0 0 1px ${vars.color.shadow.md}`,
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${vars.color.bg.tertiary}`,
  borderRadius: '0.25rem',
  overflowY: 'auto',
});

export const option = style({
  padding: '0 1rem',
  lineHeight: '2.5rem',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundColor: 'transparent',
  transition: 'background-color 0.2s ease-in-out',
  border: 'none',
  color: vars.color.text.primary,
  textAlign: 'left',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.primary,
      },
    },
  },
});

export const openIcon = style({
  width: '1.5rem',
  height: '2rem',
  transition: 'transform 0.2s ease-in-out',
  fill: vars.color.text.secondary,
});

export const openIconActive = style({
  transform: 'rotate(90deg)',
});
