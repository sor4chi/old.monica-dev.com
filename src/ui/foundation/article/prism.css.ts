import { globalStyle } from '@vanilla-extract/css';

import { content } from './article.css';

globalStyle(`${content} code[class*="language-"], pre[class*="language-"]`, {
  color: '#f8f8f2',
  background: 'none',
  fontFamily: '"Fira Code", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
  textAlign: 'left',
  whiteSpace: 'pre',
  wordSpacing: 'normal',
  wordBreak: 'normal',
  wordWrap: 'normal',
  lineHeight: '1.5',
  MozTabSize: '4',
  OTabSize: '4',
  tabSize: '4',
  WebkitHyphens: 'none',
  MozHyphens: 'none',
  msHyphens: 'none',
  hyphens: 'none',
});

globalStyle(`${content} pre[class*="language-"]`, {
  padding: '1rem',
  margin: '0.5rem 0',
  overflow: 'auto',
  borderRadius: '0.3rem',
});

globalStyle(`${content} :not(pre) > code[class*="language-"], pre[class*="language-"]`, {
  background: '#2E3440',
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
  opacity: '0.7',
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
