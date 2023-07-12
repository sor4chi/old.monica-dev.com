import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const styles = {
  title: style({
    color: vars.color.gray[12],
  }),
};
