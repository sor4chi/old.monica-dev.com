import { gql } from 'graphql-request';
import Link from 'next/link';

import type { TagListFragmentResponse } from '../tagList';
import { TagList, TagListFragment } from '../tagList';

import * as styles from './list.css';

import { parseTwemoji } from '@/lib/twemoji';
import { Text } from '@/ui/foundation/text';
import { formatYMD } from '@/util/date';

export const BlogListFragment = gql`
  ${TagListFragment}

  fragment BlogListFragment on BlogConnection {
    edges {
      node {
        title
        slug
        description
        createdAt
        tags {
          ...TagListFragment
        }
      }
    }
  }
`;

export type BlogListFragmentResponse = {
  edges: {
    node: {
      title: string;
      slug: string;
      description: string;
      createdAt: Date;
      tags: TagListFragmentResponse[];
    };
  }[];
};

interface Props {
  relay: BlogListFragmentResponse;
}

export const BlogList = ({ relay }: Props) => {
  if (!relay.edges.length) {
    return (
      <div className={styles.container}>
        <p className={styles.noItems} dangerouslySetInnerHTML={{ __html: parseTwemoji('Sorry, no items found. 😭') }} />
      </div>
    );
  }

  return (
    <ul className={styles.container}>
      {relay.edges.map(({ node }) => (
        <li key={node.slug} className={styles.item}>
          <time className={styles.date}>{formatYMD(node.createdAt)}</time>
          <Link href={`/blog/${node.slug}`} className={styles.link} passHref>
            <h2 className={styles.title}>
              <Text value={node.title} />
            </h2>
            <p className={styles.description}>{node.description}</p>
          </Link>
          <TagList tags={node.tags} hrefGenerator={(tag) => `/blog?tags=${tag}`} />
        </li>
      ))}
    </ul>
  );
};
