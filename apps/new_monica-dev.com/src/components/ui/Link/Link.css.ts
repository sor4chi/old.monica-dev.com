import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const styles = {
  link: style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.spacing.relative[2],
    textDecoration: 'none',

    backgroundColor: vars.color.gray[1],
    color: vars.color.gray[11],
    border: 'none',
    borderRadius: vars.spacing.relative[2],
    padding: `${vars.spacing.relative[2]} ${vars.spacing.relative[2]}`,
    boxSizing: 'border-box',
    cursor: 'pointer',

    transition: 'background-color 0.1s ease-in-out, box-shadow  ease-in-out',

    ':hover': {
      backgroundColor: vars.color.gray[3],
    },
    ':focus-visible': {
      outline: 'none',
      boxShadow: `0 0 0 2px ${vars.color.blue[8]}`,
    },
  }),
};
