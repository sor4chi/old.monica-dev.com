import { globalStyle, style } from '@vanilla-extract/css';

import { constants, vars } from '@/styles/theme.css';

export const styles = {
  container: style({
    display: 'flex',
    width: '100%',
    maxWidth: constants.breakpoint.lg,
    gap: constants.size.gridXGap,
    marginInline: 'auto',
    containerType: 'inline-size',

    '@container': {
      [`(max-width: ${constants.breakpoint.lg})`]: {
        maxWidth: constants.breakpoint.md,
      },
      [`(max-width: ${constants.breakpoint.md})`]: {
        flexDirection: 'column',
        maxWidth: constants.breakpoint.sm,
      },
    },
  }),
  asideLeft: style({
    position: 'sticky',
    top: vars.spacing.relative[4],
    height: 'fit-content',
    width: constants.size.sideWidth,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: vars.spacing.absolute[8],
  }),
  toc: style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.absolute[2],
    fontSize: vars.font.size.sm,
    paddingLeft: vars.spacing.relative[4],
    width: vars.spacing.full,
    boxSizing: 'border-box',
    marginTop: vars.spacing.relative[2],

    '@container': {
      [`(max-width: ${constants.breakpoint.sm})`]: {
        display: 'none',
      },
    },
  }),
  tocItem: style({
    listStyle: 'none',
  }),
  asideRight: style({
    position: 'sticky',
    top: vars.spacing.relative[4],
    height: 'fit-content',
    width: constants.size.sideWidth,
    flexShrink: 0,

    '@container': {
      [`(max-width: ${constants.breakpoint.md})`]: {
        display: 'none',
      },
    },
  }),
  content: style({
    width: vars.spacing.full,
    minWidth: 0,
  }),
  hero: style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.absolute[2],
    marginBottom: vars.spacing.relative[4],
  }),
  heroTitle: style({
    color: vars.color.gray[12],
    fontSize: vars.font.size.lg,
    fontWeight: 700,
  }),
  heroDate: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
  }),
  article: style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.relative[4],
  }),
  thumbnail: style({
    width: '100%',
    aspectRatio: '640 / 360',
    height: 'auto',
    borderRadius: vars.spacing.relative[2],
    objectFit: 'cover',
    overflow: 'hidden',
    marginBottom: vars.spacing.relative[4],
  }),
};

globalStyle(`${styles.article} h2`, {
  fontSize: vars.font.size.lg,
  fontWeight: 700,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[8],
});

globalStyle(`${styles.article} h3`, {
  fontSize: vars.font.size.base,
  fontWeight: 700,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[6],
});

globalStyle(`${styles.article} h4`, {
  fontSize: vars.font.size.sm,
  fontWeight: 700,
  color: vars.color.gray[12],
  marginTop: vars.spacing.relative[4],
});

globalStyle(`${styles.article} p`, {
  fontSize: vars.font.size.base,
  color: vars.color.gray[12],
  lineHeight: 1.8,
});

globalStyle(`${styles.article} ul`, {
  paddingLeft: vars.spacing.relative[4],
});

globalStyle(`${styles.article} ol`, {
  paddingLeft: vars.spacing.relative[6],
});

globalStyle(`${styles.article} ul li`, {
  listStyle: 'none',
  position: 'relative',
});

globalStyle(`${styles.article} li`, {
  position: 'relative',
  lineHeight: 1.8,
});

globalStyle(`${styles.article} ul li::before`, {
  content: '"-"',
  position: 'absolute',
  left: `calc(-1 * ${vars.spacing.relative[4]})`,
  color: vars.color.gray[12],
});

globalStyle(`${styles.article} table`, {
  width: '100%',
  borderCollapse: 'collapse',
});

globalStyle(`${styles.article} table th`, {
  padding: vars.spacing.relative[2],
  fontWeight: 700,
  color: vars.color.gray[12],
  borderBottom: `1px solid ${vars.color.gray[4]}`,
});

globalStyle(`${styles.article} table tr + tr > td`, {
  borderTop: `1px solid ${vars.color.gray[4]}`,
});

globalStyle(`${styles.article} table td`, {
  padding: vars.spacing.relative[2],
});

globalStyle(`${styles.article} hr`, {
  border: 'none',
  height: '1px',
  backgroundColor: vars.color.gray[4],
  margin: `${vars.spacing.relative[4]} 0`,
});

globalStyle(`${styles.article} blockquote`, {
  borderLeft: `4px solid ${vars.color.gray[4]}`,
  paddingLeft: vars.spacing.relative[4],
});

globalStyle(`${styles.article} .contains-task-list`, {
  padding: 0,
});

globalStyle(`${styles.article} .contains-task-list .contains-task-list`, {
  paddingLeft: vars.spacing.relative[6],
});

globalStyle(`${styles.article} .task-list-item::before`, {
  display: 'none',
});

globalStyle(`${styles.article} :not(pre) > code`, {
  backgroundColor: vars.color.gray[4],
  padding: vars.spacing.relative[1],
  borderRadius: vars.spacing.relative[1],
});

globalStyle(`${styles.article} .math-display`, {
  overflowX: 'auto',
  width: '100%',
});
