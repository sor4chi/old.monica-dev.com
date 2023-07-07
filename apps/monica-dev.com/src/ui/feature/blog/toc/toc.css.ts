import { style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const tocList = style({
  maxHeight: '70vh',
  height: 'fit-content',
  overflowY: 'auto',
  padding: '0 1rem',
});

export const tocTitle = style({
  fontSize: '1.25rem',
  fontWeight: 400,
  marginBottom: '1rem',
  marginTop: 0,
  paddingLeft: '1rem',
});

export const tocWrapper = style({
  paddingLeft: '1rem',
  listStyle: 'none',
  margin: 0,
});

export const tocTop = style({
  padding: '0 !important',
});

const TOC_ITEM_LINE_HEIGHT = '1.5rem';

export const tocItem = style({
  fontSize: '1rem',
  lineHeight: TOC_ITEM_LINE_HEIGHT,
  marginBottom: '0.5rem',
  position: 'relative',
});

export const tocItemLink = style({
  color: vars.color.text.tertiary,
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
  color: `${vars.color.text.primary} !important`,

  ':before': {
    content: '""',
    position: 'absolute',
    top: `calc(${TOC_ITEM_LINE_HEIGHT} / 2)`,
    left: '-1rem',
    transform: 'translateY(-50%)',
    backgroundColor: vars.color.accent.primary,

    width: '0.5rem',
    height: '0.5rem',
    clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
  },
});
