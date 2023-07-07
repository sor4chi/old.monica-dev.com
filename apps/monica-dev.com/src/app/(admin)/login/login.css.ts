import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  position: 'relative',
  width: '100vw',
  height: '100dvh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const title = style({
  textAlign: 'center',
});

export const wrapper = style({
  padding: '1rem',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  maxWidth: '24rem',
  overflow: 'hidden',
});

export const backLink = style({
  color: vars.color.text.tertiary,
  textDecoration: 'none',
  fontSize: '1rem',
  width: 'fit-content',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        textDecoration: 'underline',
      },
    },
  },
});
