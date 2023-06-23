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
  width: 10,
  height: 10,
});

globalStyle('::-webkit-scrollbar-thumb', {
  borderRadius: 6,
  border: `2px solid transparent`,
  boxShadow: `inset 0 0 0 10px ${vars.color.bg.tertiary}`,
});

globalStyle('::-webkit-scrollbar-track', {
  backgroundColor: 'transparent',
});

globalStyle('::-webkit-scrollbar-corner', {
  backgroundColor: 'transparent',
});

globalStyle('::selection', {
  backgroundColor: vars.color.bg.tertiary,
  color: vars.color.text.primary,
});
