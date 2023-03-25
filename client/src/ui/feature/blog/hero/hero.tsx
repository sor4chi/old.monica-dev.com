import { clsx } from 'clsx';

import type { TagListFragmentResponse } from '../tagList';
import { TagList, TagListFragment } from '../tagList';

import * as styles from './hero.css';

import { gql } from '@/lib/graphql';
import { Text } from '@/ui/foundation/text';
import { formatYYYYMMDD } from '@/util/date';

export const BlogHeroFragment = gql`
  ${TagListFragment}

  fragment BlogHeroFragment on Blog {
    title
    createdAt
    updatedAt
    tags {
      ...TagListFragment
    }
  }
`;

export type BlogHeroFragmentResponse = {
  title: string;
  createdAt: Date;
  updatedAt: Date;
  tags: TagListFragmentResponse[];
};

interface Props {
  blog: BlogHeroFragmentResponse;
}

export const BlogHero = ({ blog }: Props) => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        <Text value={blog.title} />
      </h1>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Created at</span>
          <span>{formatYYYYMMDD(blog.createdAt)}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Updated at</span>
          <span>{formatYYYYMMDD(blog.updatedAt)}</span>
        </div>
        <div className={clsx(styles.metaItem, styles.tagList)}>
          <span className={styles.metaLabel}>Tags</span>
          <TagList tags={blog.tags} hrefGenerator={(tag) => `/blog?tags=${tag}`} />
        </div>
      </div>
    </section>
  );
};
