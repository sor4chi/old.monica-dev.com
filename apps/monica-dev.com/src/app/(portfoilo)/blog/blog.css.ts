import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const title = style({
  color: vars.color.text.primary,
  fontSize: '2rem',
  fontWeight: 300,
  margin: '2rem 0 0.5rem',
  textAlign: 'center',
});

export const infomations = style({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '0.5rem 0 1rem',
  alignItems: 'center',
});

export const rss = style({
  width: '2rem',
  height: '2rem',
  padding: '0.5rem',
  borderRadius: '0.5rem',
  transition: 'background-color 0.2s ease-in-out',

  ':hover': {
    backgroundColor: vars.color.bg.secondary,
  },
});
