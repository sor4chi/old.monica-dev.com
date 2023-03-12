import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const title = style({
  color: vars.color.text.primary,
  fontSize: '2rem',
  fontWeight: 300,
  margin: '2rem 0',
  textAlign: 'center',
});

export const text = style({
  color: vars.color.text.secondary,
  fontSize: '1.25rem',
  fontWeight: 300,
  margin: '2rem 0',
  textAlign: 'center',
});

globalStyle(`${text} .twemoji`, {
  width: '1em',
  height: '1em',
  verticalAlign: '-0.1em',
  margin: '0 0.25rem',
});
