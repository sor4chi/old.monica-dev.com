import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

const CONTAINER_GAP = '1rem';

export const container = style({
  display: 'flex',
  flexDirection: 'row',
  gap: CONTAINER_GAP,
  margin: '1rem 0',
  alignItems: 'stretch',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      flexDirection: 'column',
    },
  },
});

export const empty = style({
  textAlign: 'center',
  fontSize: '1rem',
  color: vars.color.text.tertiary,
});

export const item = style({
  width: `calc((100% - ${CONTAINER_GAP}) / 2)`,
});

export const link = style({
  textDecoration: 'none',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  justifyContent: 'space-between',
  height: '100%',
  boxSizing: 'border-box',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        textDecoration: 'underline',
      },
    },
  },
});

export const arrow = style({
  width: '1.5rem',
  height: '1.5rem',
  flexShrink: 0,
});

export const content = style({
  width: '100%',
});

export const title = style({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  margin: 0,
  marginBottom: '0.5rem',
  color: vars.color.text.primary,
});

export const description = style({
  fontSize: '1rem',
  margin: 0,
  color: vars.color.text.secondary,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});
