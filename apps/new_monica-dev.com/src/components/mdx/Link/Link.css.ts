import { globalStyle, style } from '@vanilla-extract/css';

import { focusInteraction } from '@/styles/common.css';
import { vars } from '@/styles/theme.css';

export const styles = {
  link: style([
    focusInteraction,
    {
      textDecoration: 'none',
      cursor: 'pointer',
      display: 'inline-block',
      borderRadius: `calc(${vars.spacing.relative[1]} / 2)`,
    },
  ]),
  linkText: style({
    borderBottom: `calc(${vars.spacing.relative[1]} / 2) solid ${vars.color.gray[8]}`,
    padding: vars.spacing.relative[1],
    transition: 'background-color 0.2s ease-in-out, border-bottom 0.2s ease-in-out',
    color: vars.color.gray[12],
  }),
  externalLinkIcon: style({
    verticalAlign: 'middle',
    color: vars.color.gray[11],
  }),
};

globalStyle(`${styles.link}:hover > ${styles.linkText}`, {
  borderBottom: `calc(${vars.spacing.relative[1]} / 2) solid ${vars.color.gray[12]}`,
  backgroundColor: vars.color.gray[4],
});
