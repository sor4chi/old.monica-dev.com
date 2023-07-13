import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const styles = {
  button: style({
    backgroundColor: vars.color.gray[1],
    color: vars.color.gray[12],
    border: 'none',
    borderRadius: vars.spacing.relative[1],
    padding: `${vars.spacing.relative[2]} ${vars.spacing.relative[4]}`,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: vars.color.gray[3],
    },
    ':focus': {
      outline: 'none',
      boxShadow: `0 0 0 ${vars.spacing.relative[1]} ${vars.color.gray[4]}`,
    },
  }),
};
