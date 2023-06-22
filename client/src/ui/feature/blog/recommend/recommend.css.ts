import { style, styleVariants } from '@vanilla-extract/css';

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
  width: '100%',
});

export const item = style({
  width: `calc((100% - ${CONTAINER_GAP}) / 2)`,

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      width: '100%',
    },
  },
});

export const link = style({
  textDecoration: 'none',
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  height: '100%',
  boxSizing: 'border-box',
  transition: 'background-color 0.2s ease-in-out',
  borderRadius: '0.5rem',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.secondary,
      },
    },
  },
});

export const left = style({
  justifyContent: 'flex-start',
});

export const right = style({
  justifyContent: 'flex-end',
});

export const arrow = style({
  width: '1.5rem',
  height: '1.5rem',
  flexShrink: 0,
  color: vars.color.text.tertiary,
});

export const content = style({
  width: 'fit-content',
});

export const title = style({
  width: 'fit-content',
  fontSize: '1.25rem',
  fontWeight: 400,
  margin: 0,
  marginBottom: '0.5rem',
  color: vars.color.text.primary,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const baseLabel = style({
  width: '100%',
  fontSize: '1rem',
  margin: 0,
  color: vars.color.text.tertiary,
  display: 'block',
});

export const label = styleVariants({
  left: [
    baseLabel,
    {
      textAlign: 'left',
    },
  ],
  right: [
    baseLabel,
    {
      textAlign: 'right',
    },
  ],
});
