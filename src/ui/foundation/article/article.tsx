import twemoji from 'twemoji';

import * as styles from './article.css';

import { parseHTMLToReactJSX } from '@/lib/markdown';

interface Props {
  /**contentはHTML(String)であり、sanitizeされていることを前提とする**/
  content: string;
}

export const Article = ({ content }: Props) => {
  return (
    <article className={styles.content}>
      {parseHTMLToReactJSX(
        twemoji.parse(content, {
          className: 'twemoji',
          ext: '.svg',
          folder: 'svg',
        }),
      )}
    </article>
  );
};
