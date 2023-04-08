import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const baseBadge = style({
  display: 'inline-block',
  padding: '0.25rem 0.5rem',
  margin: '0 0.5rem',
  borderRadius: '0.25rem',
  fontSize: '1em',
  lineHeight: 1,
  color: 'white', // fixed for contrast a11y
  backgroundColor: vars.color.error,
  whiteSpace: 'nowrap',
  userSelect: 'none',
});

export const badge = styleVariants({
  danger: [
    baseBadge,
    {
      backgroundColor: vars.color.error,
    },
  ],
  success: [
    baseBadge,
    {
      backgroundColor: vars.color.success,
    },
  ],
});
