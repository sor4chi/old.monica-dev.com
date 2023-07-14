import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const styles = {
  image: style({
    objectFit: 'cover',
    width: '100%',
    aspectRatio: '640 / 360',
    height: 'auto',
    borderRadius: vars.spacing.absolute[2],
  }),
};
