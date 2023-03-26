import { useEffect, useState } from 'react';

import { BlogListCard } from '../listCard';

import * as styles from './list.css';
import type { BlogListFragmentResponse, BlogListQueryResponse, BlogListQueryVariables } from './query';
import { BlogListQuery } from './query';

import { SITE_CONFIG } from '@/constant/site';
import { client } from '@/lib/graphql';
import { parseTwemoji } from '@/lib/twemoji';
import { Pagination } from '@/ui/foundation/pagination';

interface Props {
  relay: BlogListFragmentResponse;
  filterTags?: string[];
}

export const BlogList = ({ filterTags, relay }: Props) => {
  const [blogRelay, setBlogRelay] = useState(relay);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setBlogRelay(relay);
    setPage(1);
  }, [relay]);

  const maxPage = Math.ceil(blogRelay.totalCount / SITE_CONFIG.BLOG_LENGTH_PER_PAGE);

  const loadBefore = async () => {
    const data = await client.request<BlogListQueryResponse, BlogListQueryVariables>(BlogListQuery, {
      after: null,
      before: blogRelay.pageInfo.startCursor,
      first: null,
      last: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      tagWhereInput: filterTags && filterTags.length > 0 ? { slugIn: filterTags } : null,
    });
    setBlogRelay(data.blogs);
    setPage(page - 1);
  };

  const loadAfter = async () => {
    const data = await client.request<BlogListQueryResponse, BlogListQueryVariables>(BlogListQuery, {
      after: blogRelay.pageInfo.endCursor,
      before: null,
      first: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      last: null,
      tagWhereInput: filterTags && filterTags.length > 0 ? { slugIn: filterTags } : null,
    });
    setBlogRelay(data.blogs);
    setPage(page + 1);
  };

  if (!blogRelay.edges.length) {
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
          // add timestamp to activate rendering animation
          <BlogListCard key={node.slug + new Date().getTime()} node={node} />
        ))}
      </ul>
      <Pagination
        page={page}
        maxPage={maxPage}
        loadBefore={loadBefore}
        loadAfter={loadAfter}
        pageInfo={blogRelay.pageInfo}
      />
    </>
  );
};
