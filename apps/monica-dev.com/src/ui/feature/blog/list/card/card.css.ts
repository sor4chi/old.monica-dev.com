import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { SITE_CONFIG } from '@/constant/site';
import { vars } from '@/style/theme.css';

const fadeInAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(1rem)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

export const item = style({
  listStyle: 'none',
  opacity: 0,
  animation: `${fadeInAnimation} 0.5s ease-in-out forwards`,
});

const animationDelayStep = 0.05;

for (let i = 0; i < SITE_CONFIG.BLOG_LENGTH_PER_PAGE; i++) {
  globalStyle(`${item}:nth-child(${i + 1})`, {
    animationDelay: `${animationDelayStep * i}s`,
  });
}

export const title = style({
  fontSize: '1.5rem',
  fontWeight: 400,
  margin: 0,
  color: vars.color.text.primary,
  textDecoration: 'inherit',
});

export const description = style({
  fontSize: '1rem',
  margin: 0,
  marginTop: '0.5rem',
  color: vars.color.text.tertiary,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
});

export const link = style({
  fontSize: '1rem',
  textDecoration: 'none',
  display: 'block',
  boxSizing: 'border-box',
  padding: '0.5rem 0',
  margin: '0.5rem 0',
  position: 'relative',
});

const HOVER_ITEM_HORIZONTAL_PADDING = '0.5rem';

globalStyle(`${link}:before`, {
  content: '""',
  display: 'block',
  position: 'absolute',
  top: 0,
  left: `-${HOVER_ITEM_HORIZONTAL_PADDING}`,
  width: '100%',
  height: '100%',
  padding: `0 ${HOVER_ITEM_HORIZONTAL_PADDING}`,
  opacity: 0,
  zIndex: -1,
  transition: 'opacity 0.2s ease-in-out',
  borderRadius: '0.5rem',
  backgroundColor: vars.color.bg.secondary,
});

globalStyle(`${link}:hover:before`, {
  '@media': {
    '(hover: hover)': {
      opacity: 1,
    },
  },
});

export const date = style({
  display: 'block',
  fontSize: '1rem',
  margin: 0,
  color: vars.color.text.tertiary,
});
