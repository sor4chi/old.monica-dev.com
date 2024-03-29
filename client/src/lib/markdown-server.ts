'use server';
import 'server-only';

import refractorC from 'refractor/lang/c';
import refractorCpp from 'refractor/lang/cpp';
import refractorDiff from 'refractor/lang/diff';
import refractorGo from 'refractor/lang/go';
import refractorJava from 'refractor/lang/java';
import refractorJavascript from 'refractor/lang/javascript';
import refractorJson from 'refractor/lang/json';
import refractorPython from 'refractor/lang/python';
import refractorRust from 'refractor/lang/rust';
import refractorTypescript from 'refractor/lang/typescript';
import { refractor } from 'refractor/lib/core.js';
import rehypeKatex from 'rehype-katex';
import rehypePrismGenerator from 'rehype-prism-plus/generator';
import rehypeStringify from 'rehype-stringify';
import remarkDirective from 'remark-directive';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore remark-extract-tocの型定義がないので一旦無視
import remarkExtractToc from 'remark-extract-toc';
import remarkCodeTitle from 'remark-flexible-code-titles';
import remarkGfm from 'remark-gfm';
import remarkImageSize from 'remark-image-size';
import remarkLinkMeta from 'remark-link-meta';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSlug from 'remark-slug';
import { unified } from 'unified';

import remarkCustomDirectives from './rehype/directive';

refractor.register(refractorRust);
refractor.register(refractorTypescript);
refractor.register(refractorJavascript);
refractor.register(refractorPython);
refractor.register(refractorJava);
refractor.register(refractorC);
refractor.register(refractorCpp);
refractor.register(refractorGo);
refractor.register(refractorDiff);
refractor.register(refractorJson);

const rehypePrism = rehypePrismGenerator(refractor);

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
  .use(remarkCodeTitle) // [mdast -> mdast] codeブロックへタイトル等の構文拡張
  .use(remarkImageSize) // [hast  -> hast ] img要素にwidth/height属性を追加
  .use(remarkLinkMeta) // [hast  -> hast ] link要素にogなどのメタデータを追加
  .use(remarkRehype) // [mdast -> hast ] mdast(Markdown抽象構文木)をhast(HTML抽象構文木)に変換
  .use(rehypeKatex) // [mdast -> hast ] mathブロックをkatex.jsに対応
  .use(rehypePrism, {
    ignoreMissing: true,
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
