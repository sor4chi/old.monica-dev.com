import { useEffect, useState } from 'react';

import { BlogListCard } from './card';
import * as styles from './list.css';
import type { BlogListFragmentResponse, BlogListQueryResponse, BlogListQueryVariables } from './query';
import { BlogListQuery } from './query';

import { SITE_CONFIG } from '@/constant/site';
import { clientInBrowser } from '@/lib/graphql';
import { parseTwemoji } from '@/lib/twemoji';
import { Pagination } from '@/ui/foundation/pagination';

interface Props {
  blogsInfo: BlogListFragmentResponse;
  filterTags?: string[];
}

export const BlogList = ({ blogsInfo: _blogsInfo, filterTags }: Props) => {
  const [blogsInfo, setBlog] = useState(_blogsInfo);
  const [page, setPage] = useState(1);

  const maxPage = Math.ceil(blogsInfo.total / SITE_CONFIG.BLOG_LENGTH_PER_PAGE);

  const loadBefore = async () => {
    const res = await clientInBrowser.request<BlogListQueryResponse, BlogListQueryVariables>(BlogListQuery, {
      limit: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      offset: page * SITE_CONFIG.BLOG_LENGTH_PER_PAGE - SITE_CONFIG.BLOG_LENGTH_PER_PAGE * 2,
      tags: filterTags,
    });
    setBlog(res.blogs);
    setPage(page - 1);
  };

  const loadAfter = async () => {
    const data = await clientInBrowser.request<BlogListQueryResponse, BlogListQueryVariables>(BlogListQuery, {
      limit: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      offset: page * SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      tags: filterTags,
    });
    setBlog(data.blogs);
    setPage(page + 1);
  };

  useEffect(() => {
    setBlog(_blogsInfo);
  }, [_blogsInfo]);

  useEffect(() => {
    setPage(1);
  }, [filterTags]);

  if (!blogsInfo.data.length) {
    return (
      <div className={styles.container}>
        <p className={styles.noItems} dangerouslySetInnerHTML={{ __html: parseTwemoji('Sorry, no items found. 😭') }} />
      </div>
    );
  }

  return (
    <>
      <ul className={styles.container}>
        {blogsInfo.data.map((blog) => (
          // add timestamp to activate rendering animation
          <BlogListCard key={blog.slug + new Date().getTime()} blog={blog} />
        ))}
      </ul>
      <Pagination page={page} maxPage={maxPage} loadBefore={loadBefore} loadAfter={loadAfter} />
    </>
  );
};
