import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const card = style({
  background: vars.color.bg.secondary,
  borderRadius: '0.25rem',
  border: `1px solid ${vars.color.bg.tertiary}`,
  width: '100%',
  height: '100%',
});
