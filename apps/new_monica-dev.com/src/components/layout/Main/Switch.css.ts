import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const styles = {
  rightTopArea: style({
    position: 'fixed',
    top: vars.spacing.absolute[4],
    right: vars.spacing.absolute[4],
    zIndex: 1,
  }),
  sun: style({
    display: 'none',
  }),
  moon: style({
    display: 'none',
  }),
};

globalStyle(`.light ${styles.sun}`, {
  display: 'block',
});

globalStyle(`.dark ${styles.moon}`, {
  display: 'block',
});
