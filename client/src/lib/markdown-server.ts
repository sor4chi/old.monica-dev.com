'use server';
import 'server-only';


import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore remark-extract-tocの型定義がないので一旦無視
import remarkExtractToc from 'remark-extract-toc';
import remarkGfm from 'remark-gfm';
import remarkImageSize from 'remark-image-size';
import remarkLinkMeta from 'remark-link-meta';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSlug from 'remark-slug';
import { unified } from 'unified';

import remarkCustomDirectives from './rehype/directive';
import nordTheme from './shiki/themes/nord.json';


interface TocItem {
  /** ヘッダーのレベル */
  depth: number;
  /** ヘッダーのテキスト */
  value: string;
  /** ヘッダーの属性データ */
  data: {
    id: string;
  };
  /** ヘッダーの子要素 */
  children: TocItem[];
}

const mdHtmlProcessor = unified()
  .use(remarkParse) // [md    -> mdast] Markdownをmdast(Markdown抽象構文木)に変換
  .use(remarkSlug) // [mdast -> mdast] Headingにid付与（Toc Anchor用）
  .use(remarkGfm) // [mdast -> mdast] table等の拡張md記法変換
  .use(remarkMath) // [mdast -> mdast] mathブロックを変換
  .use(remarkDirective) // [mdast -> mdast] directiveブロックを変換
  .use(remarkCustomDirectives) // [mdast -> mdast] directiveブロックを拡張
  .use(remarkImageSize) // [hast  -> hast ] img要素にwidth/height属性を追加
  .use(remarkLinkMeta) // [hast  -> hast ] link要素にogなどのメタデータを追加
  .use(remarkRehype) // [mdast -> hast ] mdast(Markdown抽象構文木)をhast(HTML抽象構文木)に変換
  .use(rehypeKatex) // [mdast -> hast ] mathブロックをkatex.jsに対応
  .use(rehypePrettyCode, {
    keepBackground: true,
    onVisitHighlightedLine(element) {
      element.properties.className?.push('line--highlighted');
    },
    onVisitHighlightedWord(element) {
      element.properties.className = ['word'];
    },
    theme: JSON.parse(JSON.stringify(nordTheme)),
  })
  .use(rehypeStringify); // [hast  -> html ] hast(HTML抽象構文木)をHTMLに変換

const tocProcessor = unified()
  .use(remarkParse) // [md    -> mdast] Markdownをmdast(Markdown抽象構文木)に変換
  .use(remarkSlug) // [mdast -> mdast] Headingにid付与（Toc Anchor用）
  .use(remarkExtractToc, {
    keys: ['data'],
  });

export const parseMarkdown = async (mdContent: string) => {
  const [content, toc] = await Promise.all([
    mdHtmlProcessor.process(mdContent),
    tocProcessor.run(tocProcessor.parse(mdContent)),
  ]);

  return {
    content: content.toString(),
    toc: toc as unknown as TocItem[],
  };
};
