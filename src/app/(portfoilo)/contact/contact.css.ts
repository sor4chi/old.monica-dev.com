import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const title = style({
  color: vars.color.text.primary,
  fontSize: '2rem',
  lineHeight: 1,
  fontWeight: 300,
  margin: '2rem 0',
  textAlign: 'center',
});

export const formContainer = style({
  margin: '5rem 0',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      margin: '2rem 0',
    },
  },
});
