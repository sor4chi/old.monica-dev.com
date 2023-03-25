import Link from 'next/link';
import { useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import { TagList } from '../tagList';

import * as styles from './list.css';
import type {
  BlogListAfterQueryResponse,
  BlogListAfterQueryVariables,
  BlogListBeforeQueryResponse,
  BlogListBeforeQueryVariables,
  BlogListFragmentResponse,
} from './query';
import { BlogListAfterQuery, BlogListBeforeQuery } from './query';

import { SITE_CONFIG } from '@/constant/site';
import { client } from '@/lib/graphql';
import { parseTwemoji } from '@/lib/twemoji';
import { Button } from '@/ui/foundation/button';
import { Text } from '@/ui/foundation/text';
import { formatYMD } from '@/util/date';

interface Props {
  relay: BlogListFragmentResponse;
}

export const BlogList = ({ relay }: Props) => {
  const [blogRelay, setBlogRelay] = useState(relay);
  const loadBefore = async () => {
    const data = await client.request<BlogListBeforeQueryResponse, BlogListBeforeQueryVariables>(BlogListBeforeQuery, {
      before: blogRelay.pageInfo.startCursor,
      last: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
    });
    setBlogRelay(data.blogs);
  };

  const loadAfter = async () => {
    const data = await client.request<BlogListAfterQueryResponse, BlogListAfterQueryVariables>(BlogListAfterQuery, {
      after: blogRelay.pageInfo.endCursor,
      first: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
    });
    setBlogRelay(data.blogs);
  };

  if (!relay.edges.length) {
    return (
      <div className={styles.container}>
        <p className={styles.noItems} dangerouslySetInnerHTML={{ __html: parseTwemoji('Sorry, no items found. 😭') }} />
      </div>
    );
  }

  return (
    <>
      <ul className={styles.container}>
        {blogRelay.edges.map(({ node }) => (
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
      <div className={styles.pagination}>
        {blogRelay.pageInfo.hasPreviousPage && (
          <Button onClick={loadBefore} variant="secondary">
            <MdArrowBackIos />
            Prev
          </Button>
        )}
        {blogRelay.pageInfo.hasNextPage && (
          <Button onClick={loadAfter} variant="secondary">
            Next
            <MdArrowForwardIos />
          </Button>
        )}
      </div>
    </>
  );
};
