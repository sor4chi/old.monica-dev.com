import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const content = style({
  width: '100%',
  minWidth: 0,
});

globalStyle(`${content} h2`, {
  margin: 0,
  marginBottom: '1rem',
  padding: '0.5rem 0',
  color: vars.color.text.primary,
  borderBottom: `1px solid ${vars.color.accent.primary}`,
});

globalStyle(`${content} h3`, {
  margin: 0,
  marginBottom: '1rem',
  padding: '0.5rem 0',
  color: vars.color.text.primary,
});

globalStyle(`${content} h4`, {
  margin: 0,
  marginBottom: '1rem',
  padding: '0.5rem 0',
  color: vars.color.text.primary,
});

globalStyle(`${content} p`, {
  color: vars.color.text.secondary,
});

globalStyle(`${content} ul`, {
  paddingLeft: '1rem',
  listStyle: 'none',
});

const listLineHeight = '2rem';

globalStyle(`${content} li`, {
  color: vars.color.text.secondary,
  lineHeight: listLineHeight,
  position: 'relative',
});

const bulletSize = '0.5rem';

globalStyle(`${content} ul > li:before`, {
  content: '',
  position: 'absolute',
  display: 'block',
  left: '-1rem',
  top: `calc(${listLineHeight} / 2 - ${bulletSize} / 2)`,
  width: bulletSize,
  height: bulletSize,
  fontWeight: 'bold',
  backgroundColor: vars.color.accent.primary,
  borderRadius: '50%',
});

globalStyle(`${content} table`, {
  width: '100%',
  borderCollapse: 'collapse',
});

globalStyle(`${content} th`, {
  border: `1px solid ${vars.color.bg.secondary}`,
  padding: '0.5rem',
  backgroundColor: vars.color.bg.secondary,
});

globalStyle(`${content} td`, {
  border: `1px solid ${vars.color.bg.secondary}`,
  padding: '0.5rem',
  color: vars.color.text.secondary,
});

globalStyle(`${content} a`, {
  color: vars.color.accent.primary,
  textDecoration: 'none',
  fontWeight: 700,
  margin: '0 0.25rem',
  wordBreak: 'break-word',
});

globalStyle(`${content} a:hover`, {
  '@media': {
    'screen and (hover: hover)': {
      textDecoration: 'underline',
    },
  },
});

globalStyle(`${content} strong`, {
  fontWeight: 700,
  color: vars.color.text.primary,
  margin: '0 0.25rem',
});

globalStyle(`${content} em`, {
  fontStyle: 'italic',
  color: vars.color.text.primary,
  margin: '0 0.25rem',
});

globalStyle(`${content} blockquote`, {
  borderLeft: `0.25rem solid ${vars.color.accent.primary}`,
  padding: '0 1rem',
  margin: '1rem 0',
  color: vars.color.text.tertiary,
});

globalStyle(`${content} :not(pre) > code`, {
  padding: '0.25rem 0.5rem',
  fontSize: '0.875rem',
  backgroundColor: vars.color.bg.secondary,
  color: vars.color.text.secondary,
  borderRadius: '0.25rem',
  margin: '0.25rem',
});

globalStyle(`${content} .twemoji`, {
  height: '1em',
  width: '1em',
  display: 'inline-block',
  verticalAlign: 'middle',
});
