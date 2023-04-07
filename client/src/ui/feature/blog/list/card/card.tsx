import Link from 'next/link';

import type { TagListFragmentResponse } from '../../tagList';
import { TagList, TagListFragment } from '../../tagList';

import * as styles from './card.css';

import { gql } from '@/lib/graphql';
import { Tag } from '@/ui/foundation/tag';
import { Text } from '@/ui/foundation/text';
import { formatDateEn } from '@/util/date';

export const BlogListCardFragment = gql`
  ${TagListFragment}

  fragment BlogListCardFragment on Blog {
    slug
    title
    description
    createdAt
    publishedAt
    tags {
      ...TagListFragment
    }
  }
`;

export type BlogListCardFragmentResponse = {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  publishedAt: string;
  tags: TagListFragmentResponse[];
};

interface Props {
  blog: BlogListCardFragmentResponse;
}

const LINKS = {
  blog: (slug: string) => `/blog/${slug}`,
  tag: (tag: string) => `/blog?tags=${tag}`,
} as const;

export const BlogListCard = ({ blog }: Props) => (
  <li className={styles.item}>
    <time className={styles.date}>{formatDateEn(blog.createdAt)}</time>
    <Link href={LINKS.blog(blog.slug)} className={styles.link} passHref>
      <h2 className={styles.title}>
        <Text value={blog.title} />
        {!blog.publishedAt && <Tag variant="danger">Draft</Tag>}
      </h2>
      <p className={styles.description}>{blog.description}</p>
    </Link>
    <TagList tags={blog.tags} hrefGenerator={LINKS.tag} />
  </li>
);
