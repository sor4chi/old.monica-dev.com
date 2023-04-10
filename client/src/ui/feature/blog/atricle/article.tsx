import { Share } from '../share';
import type { TocItemProps } from '../toc';
import { Toc } from '../toc';

import * as styles from './article.css';

import { gql } from '@/lib/graphql';
import { Article } from '@/ui/foundation/article';

export const BlogArticleFragment = gql`
  fragment BlogArticleFragment on Blog {
    id
    title
    content
  }
`;

export type BlogArticleFragmentResponse = {
  id: number;
  title: string;
  content: string;
};

interface Props {
  id: number;
  title: string;
  content: string;
  toc: TocItemProps[];
}

export const BlogArticle = ({ content, id, title, toc }: Props) => {
  return (
    <section className={styles.detail}>
      <Article content={content} />
      <hr className={styles.sidebarDivider} />
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <Toc toc={toc} />
          <Share id={id} title={title} />
        </div>
      </aside>
    </section>
  );
};
