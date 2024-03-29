import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const hero = style({
  margin: '4rem 0',
  textAlign: 'center',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      margin: '2rem 0',
    },
  },
});

export const meta = style({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'center',
  gap: '3rem',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      display: 'grid',
      gridTemplateColumns: 'min-content min-content',
      gap: '1rem 5rem',
    },
  },
});

export const tagList = style({
  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      gridColumn: '1 / 3',
      width: '100%',
    },
  },
});

export const metaItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flexDirection: 'column',
  color: vars.color.text.tertiary,
  gap: '0.5rem',
  maxWidth: '20rem',
  flexWrap: 'wrap',
});

export const metaLabel = style({
  fontSize: '0.875rem',
  fontWeight: 300,
  margin: 0,
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 300,
  margin: 0,
  marginBottom: '2rem',
  color: vars.color.text.primary,
  textAlign: 'center',
});

export const titleWord = style({
  display: 'inline-block',
});

export const detail = style({
  display: 'flex',
  gap: '2rem',
});

export const sidebar = style({
  width: '15rem',
  flexShrink: 0,
  display: 'flex',
  gap: '2rem',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      display: 'none',
    },
  },
});

export const sidebarDivider = style({
  margin: 0,
  height: '70vh',
  width: 1,
  border: 'none',
  background: vars.color.bg.secondary,
  position: 'sticky',
  top: `calc(${vars.size.headerHeight} + 1rem)`,
});
