import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const anchor = style({
  color: vars.color.text.tertiary,
  fontWeight: 500,
  margin: 0,
  wordBreak: 'break-word',
  position: 'relative',
  textDecoration: 'underline',
  textDecorationColor: vars.color.bg.tertiary,
  textDecorationThickness: '0.125rem',
  textUnderlineOffset: '0.25rem',
  padding: '0.125rem 0.25rem',
  alignItems: 'center',

  '@media': {
    'screen and (hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.secondary,
      },
    },
  },

  ':focus-visible': {
    outline: 'none',
    boxShadow: `0 0 0 0.125rem ${vars.color.accent.primary}`,
  },
});
