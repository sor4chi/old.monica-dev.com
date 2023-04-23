import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const _divider = style({
  backgroundColor: vars.color.bg.secondary,
  border: 'none',
  top: `calc(${vars.size.headerHeight} + 1rem)`,
  transition: 'background-color 0.2s ease-in-out',
});

export const DIVIDER_MARGIN = '0.5rem';

export const divider = styleVariants({
  vertical: [
    _divider,
    {
      height: '100%',
      width: '1px',
      margin: `0 ${DIVIDER_MARGIN}`,
    },
  ],
  horizontal: [
    _divider,
    {
      width: '100%',
      height: '1px',
      margin: `${DIVIDER_MARGIN} 0`,
    },
  ],
});
