import { BlogShare } from '../share';
import type { BlogShareFragmentResponse } from '../share/query';
import { BlogShareFragment } from '../share/query';
import type { TocItemProps } from '../toc';
import { Toc } from '../toc';

import * as styles from './article.css';

import { gql } from '@/lib/graphql';
import { Article } from '@/ui/foundation/article';

export const BlogArticleFragment = gql`
  ${BlogShareFragment}

  fragment BlogArticleFragment on Blog {
    title
    content
    ...BlogShareFragment
  }
`;

export type BlogArticleFragmentResponse = {
  title: string;
  content: string;
} & BlogShareFragmentResponse;

type Props = {
  toc: TocItemProps[];
} & BlogArticleFragmentResponse;

export const BlogArticle = ({ content, id, title, toc }: Props) => {
  return (
    <section className={styles.detail}>
      <Article content={content} />
      <hr className={styles.sidebarDivider} />
      <aside className={styles.sidebar}>
        <div className={styles.sidebarInner}>
          <Toc toc={toc} />
          <BlogShare id={id} title={title} />
        </div>
      </aside>
    </section>
  );
};
