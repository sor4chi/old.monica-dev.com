import { createElement, Fragment } from 'react';
import rehypeParse from 'rehype-parse';
import rehypeReact from 'rehype-react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore remark-extract-tocの型定義がないので一旦無視
import { unified } from 'unified';

import { Anchor } from '@/ui/foundation/anchor';
import { Image } from '@/ui/foundation/image';

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
        img: Image,
      },
      createElement,
      Fragment,
    }); // [hast -> jsx] hast(HTML抽象構文木)を一部ReactJSXに変換
  return processor.processSync(htmlContent).result;
};
