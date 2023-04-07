import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  border: `1px solid ${vars.color.bg.secondary}`,
  borderRadius: '0.5rem',
  overflow: 'hidden',
  backgroundColor: vars.color.bg.primary,
  color: vars.color.text.primary,
  fontSize: '1rem',

  '@media': {
    [`screen and (max-width: ${vars.breakpoint.mobile})`]: {
      borderRadius: '0.25rem',
    },
  },
});

export const thead = style({
  backgroundColor: vars.color.bg.secondary,
  color: vars.color.text.secondary,
});

export const th = style({
  padding: '0.75rem 1rem',
  borderBottom: `1px solid ${vars.color.bg.secondary}`,
  verticalAlign: 'bottom',
  textAlign: 'inherit',
  fontSize: '0.875rem',
  fontWeight: 500,
  lineHeight: 1.5,
});

export const tbody = style({
  backgroundColor: vars.color.bg.primary,
  color: vars.color.text.primary,
});

export const tr = style({
  borderBottom: `1px solid ${vars.color.bg.secondary}`,
  transition: 'background-color 0.2s ease-in-out',

  ':last-child': {
    borderBottom: 0,
  },
});

export const trClickable = style({
  cursor: 'pointer',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        backgroundColor: vars.color.bg.secondary,
      },
    },
  },
});

export const td = style({
  padding: '0.75rem 1rem',
  verticalAlign: 'top',
  textAlign: 'inherit',
  fontSize: '0.875rem',
  fontWeight: 400,
  lineHeight: '1.5rem',
});
