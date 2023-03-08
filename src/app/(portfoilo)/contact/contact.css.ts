import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const title = style({
  color: vars.color.text.primary,
  fontSize: '2rem',
  fontWeight: 700,
  margin: '2rem 0',
  textAlign: 'center',
});
