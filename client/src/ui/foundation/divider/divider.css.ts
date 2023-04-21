import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const _divider = style({
  margin: 0,
  backgroundColor: vars.color.bg.secondary,
  border: 'none',
  top: `calc(${vars.size.headerHeight} + 1rem)`,
});

export const divider = styleVariants({
  vertical: [
    _divider,
    {
      height: '100%',
      width: '1px',
    },
  ],
  horizontal: [
    _divider,
    {
      width: '100%',
      height: '1px',
    },
  ],
});
