import { globalStyle, keyframes, style } from '@vanilla-extract/css';

import { SITE_CONFIG } from '@/constant/site';
import { vars } from '@/style/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  padding: 0,
});

export const noItems = style({
  fontSize: '1.2rem',
  fontWeight: 400,
  margin: '20vh 0',
  color: vars.color.text.secondary,
  textAlign: 'center',
});

globalStyle(`${noItems} > .twemoji`, {
  width: '1em',
  height: '1em',
});

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
  fontWeight: 700,
  marginTop: '1rem',
  marginBottom: '0.5rem',
  color: vars.color.text.primary,
  textDecoration: 'inherit',
});

export const description = style({
  fontSize: '1rem',
  margin: '0.5rem 0',
  color: vars.color.text.secondary,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
});

export const link = style({
  fontSize: '1rem',
  margin: 0,
  textDecoration: 'none',

  '@media': {
    '(hover: hover)': {
      ':hover': {
        textDecoration: 'underline',
        textDecorationColor: vars.color.accent.primary,
      },
    },
  },
});

export const date = style({
  display: 'block',
  fontSize: '1rem',
  margin: 0,
  color: vars.color.text.secondary,
});

export const pagination = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  margin: '2rem 0',
});

export const page = style({
  margin: 0,
  color: vars.color.text.tertiary,
});
