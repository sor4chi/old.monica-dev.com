import { createElement } from 'react';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSlug from 'remark-slug';
import { unified } from 'unified';

import { ParsedMarkdown, TocNode } from '../../types/markdown';

import { remarkClassifyDirective } from './block';
import { remarkCodeTitle } from './code';
import { customComponents } from './components';
import { remarkExtractToc } from './toc';

export const parseMarkdownToHTML = (mdContent: string): ParsedMarkdown => {
  if (!(mdContent && mdContent.length))
    return {
      content: null,
      toc: [],
    };

  const extractedToc: TocNode[] = [];
  const processor = unified()
    .use(remarkParse) //             [md    -> mdast] Markdownをmdast(Markdown抽象構文木)に変換
    .use(remarkSlug) //              [mdast -> mdast] Headingにid付与（Toc Anchor用）
    .use(remarkGfm) //               [mdast -> mdast] table等の拡張md記法変換
    .use(remarkMath) //              [mdast -> mdast] mathブロックを変換
    .use(remarkDirective) //         [mdast -> mdast] messageブロックを変換
    .use(remarkClassifyDirective) // [mdast -> mdast] messageブロックのタイプを仕分け
    .use(remarkCodeTitle) //         [mdast -> mdast] codeブロックにタイトルを付与
    .use(remarkExtractToc, {
      depth: 6,
      callback: (toc: TocNode[]) => {
        extractedToc.push(...toc);
      },
    }) //                            [mdast -> mdast] Tocを抽出
    .use(remarkRehype) //            [mdast -> hast ] mdast(Markdown抽象構文木)をhast(HTML抽象構文木)に変換
    .use(rehypeKatex) //             [mdast -> hast ] mathブロックをkatex.jsに対応
    .use(rehypeHighlight) //         [mdast -> hast ] codeブロックをhighlight.jsに対応
    .use(rehypeStringify); //        [hast  -> html ] hast(HTML抽象構文木)をHTMLに変換

  return {
    content: processor.processSync(mdContent).toString(),
    toc: extractedToc,
  };
};

export const parseHTMLToReactJSX = (htmlContent: string) => {
  const processor = unified()
    .use(rehypeParse, {
      fragment: true,
    }) //                            [html -> hast ] HTMLをhast(HTML抽象構文木)に変換
    .use(rehypeReact, {
      createElement: createElement,
      components: customComponents,
    }); //                           [hast -> jsx  ] hast(HTML抽象構文木)を一部ReactJSXに変換
  return processor.processSync(htmlContent).result;
};
