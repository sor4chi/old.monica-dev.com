import type { TocItemProps } from '../toc';
import { Toc } from '../toc';

import * as styles from './article.css';

import { gql } from '@/lib/graphql';
import { Article } from '@/ui/foundation/article';

export const BlogArticleFragment = gql`
  fragment BlogArticleFragment on Blog {
    content
  }
`;

export type BlogArticleFragmentResponse = {
  content: string;
};

interface Props {
  content: string;
  toc: TocItemProps[];
}

export const BlogArticle = ({ content, toc }: Props) => {
  return (
    <section className={styles.detail}>
      <Article content={content} />
      <aside className={styles.sidebar}>
        <hr className={styles.sidebarDivider} />
        <Toc toc={toc} />
      </aside>
    </section>
  );
};
