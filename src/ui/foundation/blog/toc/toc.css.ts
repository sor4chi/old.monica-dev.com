import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const toc = style({
  position: 'sticky',
  top: `calc(${vars.size.headerHeight} + 1rem)`,
  height: 'fit-content'
});

export const tocTitle = style({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '1rem',
  marginTop: 0,
});

export const tocWrapper = style({
  paddingLeft: '1rem',
  listStyle: 'none',
  margin: 0,
});

export const tocTop = style({
  padding: '0 !important',
});

export const tocItem = style({
  fontSize: '1rem',
  lineHeight: 2,
});

export const tocItemLink = style({
  color: vars.color.text.secondary,
  textDecoration: 'none',
});

export const tocActive = style({
  color: vars.color.accent.primary,
  fontWeight: 700,
});
