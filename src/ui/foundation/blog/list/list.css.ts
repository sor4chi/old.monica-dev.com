import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  padding: '0 1rem',
});

export const noItems = style({
  fontSize: '1.2rem',
  fontWeight: 400,
  margin: '20vh 0',
  color: vars.color.text.secondary,
  textAlign: 'center',
});

globalStyle(`${noItems} > .twemoji`, {
  width: '1em',
  height: '1em',
});

export const item = style({
  listStyle: 'none',
});

export const title = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginTop: '1rem',
  marginBottom: '0.5rem',
  color: vars.color.text.primary,
});

export const description = style({
  fontSize: '1rem',
  margin: '0.5rem 0',
  color: vars.color.text.secondary,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
});

export const link = style({
  fontSize: '1rem',
  margin: 0,
  textDecoration: 'none',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        textDecoration: 'underline',
        textDecorationColor: vars.color.accent.primary,
      },
    },
  },
});

export const date = style({
  display: 'block',
  fontSize: '1rem',
  margin: 0,
  color: vars.color.text.secondary,
});
