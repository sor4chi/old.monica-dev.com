import { useEffect } from 'react';

import * as styles from './article.css';

import { parseHTMLToReactJSX } from '@/lib/markdown-client';
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
    const tweets = document.querySelectorAll('blockquote.twitter-tweet');
    const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    tweets.forEach((tweet) => {
      tweet.setAttribute('data-theme', theme);
    });
  }, [content]);

  return <article className={styles.content}>{parseHTMLToReactJSX(parseTwemoji(content))}</article>;
};
