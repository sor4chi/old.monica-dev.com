import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from '@/style/theme.css';

export const content = style({
  width: '100%',
  minWidth: 0,
  lineHeight: 1.9,
});

globalStyle(`${content} > *:first-child`, {
  marginTop: '0 !important',
});

globalStyle(`${content} h2`, {
  fontSize: '1.5rem',
  transition: 'border-color 0.2s ease-in-out, color 0.2s ease-in-out',

  margin: 0,
  marginTop: '3rem',
  marginBottom: '1rem',
  padding: '0.5rem 0',
  color: vars.color.text.primary,
  fontWeight: 400,
  borderBottom: `1px solid ${vars.color.bg.secondary}`,
});

globalStyle(`${content} h3`, {
  fontSize: '1.25rem',
  transition: 'border-color 0.2s ease-in-out, color 0.2s ease-in-out',
  margin: 0,
  marginTop: '2rem',
  marginBottom: '1rem',
  padding: '0.5rem 0',
  color: vars.color.text.secondary,
  fontWeight: 400,
});

globalStyle(`${content} h4, h5, h6`, {
  margin: 0,
  marginTop: '1rem',
  marginBottom: '1rem',
  padding: '0.5rem 0',
  color: vars.color.text.secondary,
  fontWeight: 400,
  transition: 'color 0.2s ease-in-out',
});

globalStyle(`${content} h4`, {
  fontSize: '1.125rem',
});

globalStyle(`${content} h5`, {
  fontSize: '1rem',
});

globalStyle(`${content} h6`, {
  fontSize: '0.9rem',
});

globalStyle(`${content} p`, {
  margin: 0,
  marginTop: '1rem',
  marginBottom: '1rem',
  color: vars.color.text.tertiary,
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
  color: vars.color.text.tertiary,
  fontWeight: 500,
  margin: 0,
  wordBreak: 'break-word',
  position: 'relative',
  textDecoration: 'none',
  padding: '0 0.25rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
});

globalStyle(`${content} a:before`, {
  content: '""',
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: '2px',
  backgroundColor: vars.color.bg.tertiary,
});

globalStyle(`${content} a:hover`, {
  '@media': {
    'screen and (hover: hover)': {
      backgroundColor: vars.color.bg.secondary,
    },
  },
});

globalStyle(`${content} strong`, {
  fontWeight: 500,
  color: vars.color.text.primary,
  margin: '0 0.25rem',
});

globalStyle(`${content} em`, {
  fontStyle: 'italic',
  color: vars.color.text.primary,
  margin: '0 0.25rem',
});

globalStyle(`${content} blockquote:not(.twitter-tweet)`, {
  borderLeft: `0.25rem solid ${vars.color.accent.primary}`,
  padding: '0 1rem',
  margin: '1rem 0',
  color: vars.color.text.tertiary,
});

globalStyle(`${content} .tweet-embed`, {
  width: '100%',
  margin: '1rem 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

globalStyle(`${content} .twitter-tweet`, {
  margin: 0,
  maxWidth: '30rem !important',
});

globalStyle(`${content} :not(pre) > code`, {
  padding: '0 0.5rem',
  fontSize: '0.875rem',
  backgroundColor: vars.color.bg.secondary,
  color: vars.color.text.secondary,
  borderRadius: '0.25rem',
  margin: '0 0.25rem',
  display: 'inline-block',
  transition: 'background-color .2s ease-in-out',
});

globalStyle(`${content} .twemoji`, {
  height: '1em',
  width: '1em',
  display: 'inline-block',
  verticalAlign: 'middle',
});

globalStyle(`${content} .math`, {
  color: vars.color.text.secondary,
});

globalStyle(`${content} .math .katex`, {
  overflowX: 'auto',
});
