import { globalStyle, style } from '@vanilla-extract/css';

import { focusInteraction } from '@/styles/common.css';
import { vars } from '@/styles/theme.css';

export const styles = {
  nav: style({
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
  }),
  yearSection: style({}),
  year: style({
    fontWeight: 500,
    fontSize: vars.font.size.lg,
  }),
  list: style({
    padding: vars.spacing[0],
    margin: vars.spacing[0],
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.absolute[2],
  }),
  item: style({
    listStyle: 'none',
  }),
  link: style([
    focusInteraction,
    {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: vars.spacing.relative[3],
      textDecoration: 'none',

      backgroundColor: vars.color.gray[1],
      border: 'none',
      borderRadius: vars.spacing.relative[2],
      boxSizing: 'border-box',
      cursor: 'pointer',
      width: vars.spacing.full,
      color: vars.color.gray[12],
      fontWeight: 500,
      fontSize: vars.font.size.sm,
      padding: `${vars.spacing.relative[3]} ${vars.spacing.relative[3]}`,

      verticalAlign: 'baseline',

      position: 'relative',

      transition: 'background-color 0.2s ease-in-out, opacity 0.2s ease-in-out',

      ':hover': {
        backgroundColor: vars.color.gray[3],
      },
    },
  ]),
  publishedAt: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.xs,
    fontWeight: 400,
    marginLeft: vars.spacing.relative[3],
    verticalAlign: 'baseline',
  }),
  linkDetail: style({
    pointerEvents: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: vars.spacing.relative[2],
    position: 'absolute',
    inset: `0 0 0 ${vars.spacing.full}`,
    margin: `auto ${vars.spacing.relative[3]}`,

    color: vars.color.gray[11],

    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
  }),
  linkIcon: style({
    borderRadius: vars.spacing.relative[1],
  }),
  navigationIcon: style({
    flexShrink: 0,
  }),
};

globalStyle(`${styles.link}:hover ${styles.linkDetail}`, {
  opacity: 1,
});

globalStyle(`${styles.link}:focus-visible ${styles.linkDetail}`, {
  opacity: 1,
});

globalStyle(`${styles.yearSection} + ${styles.yearSection}`, {
  marginTop: vars.spacing.absolute[10],
});
