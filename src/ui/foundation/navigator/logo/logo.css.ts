import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const logo = style({
  selectors: {
    '.dark &': {
      rotate: '0deg',
    },
    '.light &': {
      rotate: '180deg',
    },
  },

  filter: `drop-shadow(0 0 0.1rem ${vars.color.text.primary})`,

  transition: 'rotate .5s ease-in-out',
});
