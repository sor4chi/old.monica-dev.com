import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const container = style({
  width: '100%',
  display: 'flex',
  height: '8rem',
  alignItems: 'center',
  textDecoration: 'none',
  boxSizing: 'border-box',
  backgroundColor: vars.color.bg.secondary,
  borderRadius: '0.5rem',
  border: `1px solid ${vars.color.bg.tertiary}`,
  overflow: 'hidden',
  transition: 'background-color 0.2s ease-in-out',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.primary,
      },
    },
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      height: '7rem',
    },
  },
});

globalStyle(`p:has(> ${container})`, {
  margin: '1rem 0',
});

export const content = style({
  padding: '0 1rem',
  flexGrow: 1,
});

export const title = style({
  width: '100%',
  fontSize: '1rem',
  color: vars.color.text.primary,
  lineHeight: '1.5rem',
  marginBottom: '0.5rem',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  wordBreak: 'break-all',
});

export const description = style({
  width: '100%',
  color: vars.color.text.tertiary,
  fontSize: '0.875rem',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  wordBreak: 'break-all',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      display: 'none',
    },
  },
});

export const domain = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: vars.color.text.tertiary,
  wordBreak: 'break-all',
});

export const icon = style({
  background: 'white',
  padding: '2px',
  borderRadius: '2px',
});

export const thumbnail = style({
  flexShrink: 0,
  height: '100%',
  width: 'auto',
  aspectRatio: '1200 / 630',
  objectFit: 'cover',
  objectPosition: 'center',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      aspectRatio: '1 / 1',
    },
  },
});
