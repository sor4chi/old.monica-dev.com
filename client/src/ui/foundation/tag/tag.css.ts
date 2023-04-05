import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const baseTag = style({
  display: 'inline-block',
  padding: '0.25rem 0.5rem',
  margin: '0 0.5rem',
  borderRadius: '0.25rem',
  fontSize: '0.75em',
  lineHeight: 1,
  color: vars.color.text.primary,
  backgroundColor: vars.color.error,
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  userSelect: 'none',
});

export const tag = styleVariants({
  danger: [
    baseTag,
    {
      backgroundColor: vars.color.error,
    },
  ],
  info: [
    baseTag,
    {
      backgroundColor: vars.color.accent.secondary,
    },
  ],
});
