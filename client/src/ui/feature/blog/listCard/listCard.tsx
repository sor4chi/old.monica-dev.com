import Link from 'next/link';

import type { TagListFragmentResponse } from '../tagList';
import { TagList, TagListFragment } from '../tagList';

import * as styles from './listCard.css';

import { gql } from '@/lib/graphql';
import { Text } from '@/ui/foundation/text';
import { formatYMD } from '@/util/date';

export const BlogListCardFragment = gql`
  ${TagListFragment}

  fragment BlogListCardFragment on Blog {
    slug
    title
    description
    createdAt
    tags {
      ...TagListFragment
    }
  }
`;

export type BlogListCardFragmentResponse = {
  slug: string;
  title: string;
  description: string;
  createdAt: Date;
  tags: TagListFragmentResponse[];
};

interface Props {
  node: BlogListCardFragmentResponse;
}

const LINKS = {
  blog: (slug: string) => `/blog/${slug}`,
  tag: (tag: string) => `/blog?tags=${tag}`,
} as const;

export const BlogListCard = ({ node }: Props) => (
  <li className={styles.item}>
    <time className={styles.date}>{formatYMD(node.createdAt)}</time>
    <Link href={LINKS.blog(node.slug)} className={styles.link} passHref>
      <h2 className={styles.title}>
        <Text value={node.title} />
      </h2>
      <p className={styles.description}>{node.description}</p>
    </Link>
    <TagList tags={node.tags} hrefGenerator={LINKS.tag} />
  </li>
);
