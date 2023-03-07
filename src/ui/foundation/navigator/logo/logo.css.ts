import { style } from '@vanilla-extract/css';

export const logo = style({
  selectors: {
    '.dark &': {
      rotate: '0deg',
    },
    '.light &': {
      rotate: '180deg',
    },
  },

  transition: 'rotate .5s ease-in-out',
});
