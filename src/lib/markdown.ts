import { createElement } from 'react';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore remark-extract-tocの型定義がないので一旦無視
import remarkExtractToc from 'remark-extract-toc';
import remarkCodeTitle from 'remark-flexible-code-titles';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSlug from 'remark-slug';
import { unified } from 'unified';

import { Anchor } from '@/ui/foundation/anchor';

export const parseMarkdownToHTML = (mdContent: string) => {
  const mdHtmlProcessor = unified()
    .use(remarkParse) // [md    -> mdast] Markdownをmdast(Markdown抽象構文木)に変換
    .use(remarkSlug) // [mdast -> mdast] Headingにid付与（Toc Anchor用）
    .use(remarkGfm) // [mdast -> mdast] table等の拡張md記法変換
    .use(remarkMath) // [mdast -> mdast] mathブロックを変換
    .use(remarkDirective) // [mdast -> mdast] messageブロックを変換
    .use(remarkCodeTitle) // [mdast -> mdast] codeブロックへタイトル等の構文拡張
    .use(remarkRehype) // [mdast -> hast ] mdast(Markdown抽象構文木)をhast(HTML抽象構文木)に変換
    .use(rehypeKatex) // [mdast -> hast ] mathブロックをkatex.jsに対応
    .use(rehypeHighlight) // [mdast -> hast ] codeブロックをhighlight.jsに対応
    .use(rehypeStringify); // [hast  -> html ] hast(HTML抽象構文木)をHTMLに変換

  const tocProcessor = unified()
    .use(remarkParse) // [md    -> mdast] Markdownをmdast(Markdown抽象構文木)に変換
    .use(remarkSlug) // [mdast -> mdast] Headingにid付与（Toc Anchor用）
    .use(remarkExtractToc);

  return {
    content: mdHtmlProcessor.processSync(mdContent).toString(),
    toc: tocProcessor.runSync(tocProcessor.parse(mdContent)),
  };
};

export const parseHTMLToReactJSX = (htmlContent: string) => {
  const processor = unified()
    .use(rehypeParse, {
      fragment: true,
    }) // [html -> hast] HTMLをhast(HTML抽象構文木)に変換
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .use(rehypeReact, {
      components: {
        a: Anchor,
      },
      createElement: createElement,
    }); // [hast -> jsx] hast(HTML抽象構文木)を一部ReactJSXに変換
  return processor.processSync(htmlContent).result;
};
