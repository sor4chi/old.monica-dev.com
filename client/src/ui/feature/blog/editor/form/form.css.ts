import { style } from '@vanilla-extract/css';

export const link = style({
  textDecoration: 'none',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        textDecoration: 'underline',
      },
    },
  },
});

export const linkIcon = style({
  verticalAlign: 'middle',
  paddingLeft: '0.5rem',
});
