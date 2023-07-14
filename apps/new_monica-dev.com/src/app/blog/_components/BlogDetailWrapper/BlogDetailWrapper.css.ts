import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/styles/theme.css';

export const styles = {
  nav: style({
    gridColumn: '2 / 3',
    gridRow: '2 / 3',
    position: 'sticky',
    top: vars.spacing.relative[4],
    height: 'fit-content',
  }),
  content: style({
    gridColumn: '3 / 4',
    gridRow: '2 / 3',
  }),
  hero: style({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: vars.spacing.absolute[4],
    gap: vars.spacing.absolute[2],
  }),
  title: style({
    color: vars.color.gray[12],
    fontSize: vars.font.size.lg,
    fontWeight: 500,
    margin: vars.spacing[0],
  }),
  date: style({
    color: vars.color.gray[11],
    fontSize: vars.font.size.sm,
    margin: vars.spacing[0],
  }),
  thumbnail: style({
    width: '100%',
    aspectRatio: '640 / 360',
    height: 'auto',
    borderRadius: vars.spacing.relative[2],
    objectFit: 'cover',
    overflow: 'hidden',
    marginBottom: vars.spacing.absolute[4],
  }),
  article: style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.absolute[4],
    lineHeight: 1.8,
  }),
};

globalStyle(`${styles.article} h2`, {
  fontSize: vars.font.size.lg,
  fontWeight: 500,
  color: vars.color.gray[12],
  margin: 0,
});

globalStyle(`${styles.article} h3`, {
  fontSize: vars.font.size.base,
  fontWeight: 500,
  color: vars.color.gray[12],
  margin: 0,
});

globalStyle(`${styles.article} p`, {
  fontSize: vars.font.size.base,
  color: vars.color.gray[12],
  margin: 0,
});

globalStyle(`${styles.article} ul, ${styles.article} ol`, {
  margin: 0,
  paddingLeft: vars.spacing.relative[4],
});

globalStyle(`${styles.article} ul li`, {
  listStyle: 'none',
  position: 'relative',
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
  backgroundColor: vars.color.gray[1],
  padding: vars.spacing.relative[1],
  fontWeight: 500,
  color: vars.color.gray[12],
  borderBottom: `1px solid ${vars.color.gray[4]}`,
});

globalStyle(`${styles.article} table tr + tr > td`, {
  borderTop: `1px solid ${vars.color.gray[4]}`,
});

globalStyle(`${styles.article} table td`, {
  padding: vars.spacing.relative[1],
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
  margin: `${vars.spacing.relative[4]} 0`,
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
