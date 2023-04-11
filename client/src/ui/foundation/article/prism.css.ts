import { globalStyle } from '@vanilla-extract/css';

import { content } from './article.css';

import { vars } from '@/style/theme.css';

globalStyle(`${content} code[class*="language-"], pre[class*="language-"]`, {
  color: '#f8f8f2',
  background: 'none',
  fontFamily: '"Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  textAlign: 'left',
  whiteSpace: 'pre',
  wordSpacing: 'normal',
  wordBreak: 'normal',
  wordWrap: 'normal',
  lineHeight: 1.5,
  MozTabSize: 4,
  OTabSize: 4,
  tabSize: 4,
  WebkitHyphens: 'none',
  MozHyphens: 'none',
  msHyphens: 'none',
  hyphens: 'none',
  width: 'fit-content',
  minWidth: '100%',
});

const preBorderRadius = '0.5rem';

globalStyle(`${content} pre[class*="language-"]`, {
  padding: '1rem',
  margin: 0,
  overflow: 'auto',
  borderRadius: preBorderRadius,
  width: '100%',
  boxSizing: 'border-box',
  boxShadow: vars.color.shadow.md,
});

const preBg = '#2E3440';

globalStyle(`${content} :not(pre) > code[class*="language-"], pre[class*="language-"]`, {
  background: preBg,
});

globalStyle(`${content} :not(pre) > code[class*="language-"]`, {
  padding: '0.1rem',
  borderRadius: '0.3rem',
  whiteSpace: 'normal',
});

globalStyle(`${content} .token.comment, ${content} .token.prolog, ${content} .token.doctype, ${content} .token.cdata`, {
  color: '#636f88',
});

globalStyle(`${content} .token.punctuation`, {
  color: '#81A1C1',
});

globalStyle(`${content} .namespace`, {
  opacity: 0.7,
});

globalStyle(
  `${content} .token.property, ${content} .token.tag, ${content} .token.constant, ${content} .token.symbol, ${content} .token.deleted`,
  {
    color: '#81A1C1',
  },
);

globalStyle(`${content} .token.number`, {
  color: '#B48EAD',
});

globalStyle(`${content} .token.boolean`, {
  color: '#81A1C1',
});

globalStyle(
  `${content} .token.selector, ${content} .token.attr-name, ${content} .token.string, ${content} .token.char, ${content} .token.builtin, ${content} .token.inserted`,
  {
    color: '#A3BE8C',
  },
);

globalStyle(
  `${content} .token.operator, ${content} .token.entity, ${content} .token.url, ${content} .language-css .token.string, ${content} .style .token.string, ${content} .token.variable`,
  {
    color: '#81A1C1',
  },
);

globalStyle(
  `${content} .token.atrule, ${content} .token.attr-value, ${content} .token.function, ${content} .token.class-name`,
  {
    color: '#88C0D0',
  },
);

globalStyle(`${content} .token.keyword`, {
  color: '#81A1C1',
});

globalStyle(`${content} .token.regex, ${content} .token.important`, {
  color: '#EBCB8B',
});

globalStyle(`${content} .token.important, ${content} .token.bold`, {
  fontWeight: 'bold',
});

globalStyle(`${content} .token.italic`, {
  fontStyle: 'italic',
});

globalStyle(`${content} .token.entity`, {
  cursor: 'help',
});

globalStyle(`${content} .code-line`, {
  display: 'block',
  paddingLeft: '16px',
  paddingRight: '16px',
  marginLeft: '-16px',
  marginRight: '-16px',
  borderLeft: '4px solid #00000000',
  fontSize: '14px !important',
});

globalStyle(`${content} .code-line.inserted`, {
  backgroundColor: '#a3be8c33',
});

globalStyle(`${content} .code-line.deleted`, {
  backgroundColor: '#bf616a33',
});

globalStyle(`${content} .code-line.line-number::before`, {
  display: 'inline-block',
  width: '1rem',
  textAlign: 'right',
  marginRight: '16px',
  marginLeft: '-8px',
  color: '#9CA3AF',
  content: 'attr(line)',
});

globalStyle(`${content} .code-line.highlight-line`, {
  marginLeft: '-16px',
  marginRight: '-16px',
  backgroundColor: '#ffffff11',
  borderLeft: `4px solid ${vars.color.accent.primary}` /* Set highlight accent border color */,
});

globalStyle(`${content} .remark-code-title`, {
  display: 'block',
  color: vars.color.text.secondary,
  padding: '0.5rem 1rem',
  background: vars.color.bg.secondary,
  borderRadius: '0.25rem 0.25rem 0 0',
  width: 'fit-content',
  position: 'relative',
  fontWeight: 700,
});

globalStyle(`${content} .remark-code-title:after`, {
  content: '""',
  position: 'absolute',
  top: '100%',
  left: 0,
  width: preBorderRadius,
  height: preBorderRadius,
  background: preBg,
  zIndex: -1,
});

globalStyle(`${content} .remark-code-container`, {
  margin: '0.5rem 0',
});
