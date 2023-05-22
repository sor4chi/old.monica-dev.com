import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const header = style({
  left: 0,
  position: 'fixed',
  top: 0,
  zIndex: 99,
  width: '100%',
});

export const container = style({
  alignItems: 'center',
  backdropFilter: 'blur(.5rem)',
  background: 'transparent',
  boxSizing: 'border-box',
  display: 'flex',
  gap: '1rem',
  height: vars.size.headerHeight,
  justifyContent: 'space-between',
  width: '100%',
  padding: `0 max(calc((100vw - ${vars.size.containerMaxWidth}) / 2), 1rem)`,
});

export const divider = style({
  background: vars.color.text.secondary,
  border: 'none',
  height: '1px',
  margin: 0,
  opacity: 0.2,
  width: '100%',
});

export const navigationList = style({
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
  height: '100%',
  justifyContent: 'space-between',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
});

export const navigationListItem = style({
  display: 'inline-block',
});

export const navigationLink = style({
  color: vars.color.text.primary,
  fontSize: '1rem',
  fontWeight: 400,
  textDecoration: 'none',
  transition: 'color .2s ease-in-out',
  position: 'relative',
  padding: '0.25rem 0',

  ':before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: vars.color.text.primary,
    width: '0%',
    transition: 'width .2s ease-out',
  },

  '@media': {
    '(hover: hover)': {
      selectors: {
        '&:hover:before': {
          width: '100%',
          transition: 'width .2s ease-out',
        },
      },
    },
  },
});

export const navigationLinkIcon = style({
  verticalAlign: 'middle',
  marginRight: '0.25rem',
});

export const left = style({
  alignItems: 'center',
  display: 'flex',
  gap: '1rem',
});
