import { style } from '@vanilla-extract/css';

import { focusInteraction } from '@/styles/common.css';
import { vars } from '@/styles/theme.css';

export const styles = {
  link: style([
    focusInteraction,
    {
      textDecoration: 'none',
      color: vars.color.gray[12],
      cursor: 'pointer',
      padding: vars.spacing.relative[1],
      borderBottom: `calc(${vars.spacing.relative[1]} / 2) solid ${vars.color.gray[8]}`,

      transition: 'background-color 0.2s ease-in-out, border-bottom 0.2s ease-in-out',

      ':hover': {
        backgroundColor: vars.color.gray[4],
        borderBottom: `calc(${vars.spacing.relative[1]} / 2) solid ${vars.color.gray[12]}`,
      },
    },
  ]),
  externalLinkIcon: style({
    verticalAlign: 'middle',
    color: vars.color.gray[11],
  }),
};
