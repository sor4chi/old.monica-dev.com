import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  width: '100%',
  display: 'flex',
  height: '8rem',
  alignItems: 'center',
  textDecoration: 'none',
  boxSizing: 'border-box',
  backgroundColor: vars.color.bg.secondary,
  borderRadius: '0.5rem',
  border: `1px solid ${vars.color.bg.tertiary}`,
  overflow: 'hidden',
  transition: 'background-color 0.2s ease-in-out',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.primary,
      },
    },
  },
});

globalStyle(`p:has(> ${container})`, {
  margin: '1rem 0',
});

export const content = style({
  padding: '0 1rem',
  flexGrow: 1,
});

export const title = style({
  width: '100%',
  fontSize: '1rem',
  color: vars.color.text.primary,
  lineHeight: '1.5rem',
  marginBottom: '0.5rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const description = style({
  width: '100%',
  color: vars.color.text.tertiary,
  fontSize: '0.875rem',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

export const domain = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: vars.color.text.tertiary,
});

export const thumbnail = style({
  flexShrink: 0,
  height: '100%',
  width: 'auto',
  aspectRatio: '1200 / 630',
  objectFit: 'cover',
});
