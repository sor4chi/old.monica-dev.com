import { globalStyle } from '@vanilla-extract/css';

import { content } from './article.css';

import { vars } from '@/style/theme.css';

// <div data-rehype-pretty-code-fragment> で囲まれたコードブロックのスタイル
globalStyle(`${content} div[data-rehype-pretty-code-fragment]`, {
  margin: '1em 0',
});

const PRE_BORDER_RADIUS = '0.5rem';

globalStyle(`${content} pre`, {
  overflowX: 'auto',
  borderRadius: PRE_BORDER_RADIUS,
  width: '100%',
  fontSize: '1rem',
  padding: '1rem 0',
  margin: 0,
});

globalStyle(`${content} div[data-rehype-pretty-code-title]+pre`, {
  borderRadius: `0 ${PRE_BORDER_RADIUS} ${PRE_BORDER_RADIUS} ${PRE_BORDER_RADIUS} !important`,
});

globalStyle(`${content} pre > code`, {
  display: 'grid',
  margin: 0,
  counterReset: 'line',
});

globalStyle(`${content} pre > code .line`, {
  padding: '0 1.25rem',
  borderLeft: '2px solid transparent',
});

globalStyle(`${content} pre > code .line.line--highlighted`, {
  background: '#c8c8ff1a',
  borderLeftColor: vars.color.accent.primary,
});

globalStyle(`${content} pre > code .line .word`, {
  borderRadius: '0.125rem',
  backgroundColor: '#5d646f80',
  boxShadow: '0 0 0 4px #5d646f80',
});

globalStyle(`${content} pre > code[data-line-numbers] .line::before`, {
  counterIncrement: 'line',
  content: 'counter(line)',
  display: 'inline-block',
  width: '1rem',
  marginRight: '2rem',
  textAlign: 'right',
  color: 'gray',
});

globalStyle(`${content} pre > code[data-line-numbers-max-digits='2'] > .line::before`, {
  width: '2rem',
});

globalStyle(`${content} pre > code[data-line-numbers-max-digits='3'] > .line::before`, {
  width: '3rem',
});

globalStyle(`${content} div[data-rehype-pretty-code-fragment] div[data-rehype-pretty-code-title]`, {
  display: 'block',
  color: vars.color.text.secondary,
  padding: '0.25rem 1rem',
  background: vars.color.bg.secondary,
  borderRadius: '0.25rem 0.25rem 0 0',
  width: 'fit-content',
  position: 'relative',
});
