import { globalStyle } from '@vanilla-extract/css';

import { vars } from './theme.css';

globalStyle('body', {
  backgroundColor: vars.color.bg.primary,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  margin: 0,
  padding: 0,
  transition: 'color .2s ease-in-out, background-color .2s ease-in-out, background .2s ease-in-out',
  color: vars.color.text.primary,
  accentColor: vars.color.accent.primary,
});

globalStyle('*::selection', {
  backgroundColor: vars.color.accent.primary,
  color: vars.color.text.primary,
});

globalStyle('html', {
  scrollPaddingTop: '5rem',
  scrollBehavior: 'smooth',
});

globalStyle('a', {
  color: vars.color.accent.primary,
});

globalStyle('a:focus-visible', {
  outline: `${vars.color.accent.primary} auto 2px`,
});

globalStyle('button:focus-visible', {
  outline: '2px solid',
  outlineColor: vars.color.accent.primary,
});

globalStyle('::-webkit-scrollbar', {
  overflow: 'hidden',
  width: 4,
  backgroundColor: 'transparent',
  borderRadius: 4,
});

globalStyle('::-webkit-scrollbar-thumb', {
  backgroundColor: vars.color.accent.primary,
  borderRadius: 4,
});

globalStyle('::-webkit-scrollbar-track', {
  backgroundColor: 'transparent',
  borderRadius: 4,
});

globalStyle('::-webkit-scrollbar-corner', {
  backgroundColor: vars.color.bg.secondary,
});

globalStyle('::selection', {
  backgroundColor: vars.color.accent.secondary,
  color: vars.color.text.primary,
});
