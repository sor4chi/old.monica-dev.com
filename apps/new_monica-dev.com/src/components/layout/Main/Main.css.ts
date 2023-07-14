import { style } from '@vanilla-extract/css';

import { constants } from '@/styles/theme.css';

export const styles = {
  fullMain: style({
    gridColumn: '3 / 4',
    gridRow: '2 / 3',

    '@media': {
      [constants.breakpoint.lg]: {
        gridColumn: '2 / 4',
      },
      [constants.breakpoint.md]: {
        gridColumn: '2 / 3',
      },
      [constants.breakpoint.sm]: {
        gridColumn: '1 / 2',
      },
    },
  }),
  sideMain: style({
    gridColumn: '3 / 4',
    gridRow: '2 / 3',

    '@media': {
      [constants.breakpoint.lg]: {
        gridColumn: '3 / 4',
      },
      [constants.breakpoint.md]: {
        gridColumn: '2 / 3',
      },
      [constants.breakpoint.sm]: {
        gridColumn: '1 / 2',
      },
    },
  }),
};
