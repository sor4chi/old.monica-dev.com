import { useEffect } from 'react';

import * as styles from './article.css';

import { parseHTMLToReactJSX } from '@/lib/markdown';
import { parseTwemoji } from '@/lib/twemoji';

import './prism.css';
import 'katex/dist/katex.min.css';

interface Props {
  /**contentはHTML(String)であり、sanitizeされていることを前提とする**/
  content: string;
}

export const Article = ({ content }: Props) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    window.twttr && window.twttr.widgets.load();
  }, [content]);

  return <article className={styles.content}>{parseHTMLToReactJSX(parseTwemoji(content))}</article>;
};
