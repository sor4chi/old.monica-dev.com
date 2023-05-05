import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const details = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  borderRadius: '0.25rem',
  backgroundColor: vars.color.bg.secondary,
  border: `1px solid ${vars.color.bg.tertiary}`,
  color: vars.color.text.primary,
});

export const summary = style({
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 'inherit',
  transition: 'background-color 0.3s ease-in-out',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.tertiary,
      },
    },
  },
});

globalStyle(`${summary}:focus-visible`, {
  outline: '1px solid',
  outlineColor: vars.color.accent.primary,
});

export const summaryIcon = style({
  fontSize: '1rem',
  transition: 'transform 0.3s ease-in-out',
});

export const content = style({
  overflow: 'hidden',
});

export const contentInner = style({
  padding: '1rem',
  paddingTop: 0,
});