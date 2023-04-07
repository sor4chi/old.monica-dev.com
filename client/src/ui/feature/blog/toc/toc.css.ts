import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const toc = style({
  position: 'sticky',
  top: `calc(${vars.size.headerHeight} + 1rem)`,
  height: 'fit-content',
});

export const tocTitle = style({
  fontSize: '1.25rem',
  fontWeight: 400,
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
  position: 'relative',
});

export const tocItemLink = style({
  color: vars.color.text.secondary,
  textDecoration: 'none',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        textDecoration: 'underline',
      },
    },
  },
});

export const tocActive = style({
  ':before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '-1rem',
    transform: 'translateY(-50%)',
    backgroundColor: vars.color.accent.primary,

    width: '0.5rem',
    height: '0.5rem',
    clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
    // width: '2px',
    // height: '100%',
  },
});
