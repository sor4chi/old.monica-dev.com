import * as styles from './article.css';

import { parseHTMLToReactJSX } from '@/lib/markdown';

interface Props {
  /**contentはHTML(String)であり、sanitizeされていることを前提とする**/
  content: string;
}

export const Article = ({ content }: Props) => {
  return <article className={styles.content}>{parseHTMLToReactJSX(content)}</article>;
};
