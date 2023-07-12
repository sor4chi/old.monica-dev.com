import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const styles = {
  link: style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.spacing.relative[2],
    textDecoration: 'none',

    backgroundColor: vars.color.gray[1],
    color: vars.color.gray[11],
    border: 'none',
    borderRadius: vars.spacing.relative[2],
    padding: `${vars.spacing.relative[2]} ${vars.spacing.relative[2]}`,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: vars.color.gray[2],
    },
    ':focus-visible': {
      outline: `2px solid ${vars.color.blue[8]}`,
    },
  }),
};
