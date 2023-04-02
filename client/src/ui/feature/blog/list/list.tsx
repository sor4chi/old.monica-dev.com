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
  blogs: BlogListFragmentResponse;
  filterTags?: string[];
}

export const BlogList = ({ blogs, filterTags }: Props) => {
  const [blogData, setBlogData] = useState(blogs.data);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, []);

  const maxPage = Math.ceil(blogs.total / SITE_CONFIG.BLOG_LENGTH_PER_PAGE);

  const loadBefore = async () => {
    const res = await client.request<BlogListQueryResponse, BlogListQueryVariables>(BlogListQuery, {
      limit: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      offset: page * SITE_CONFIG.BLOG_LENGTH_PER_PAGE - SITE_CONFIG.BLOG_LENGTH_PER_PAGE * 2,
      tags: filterTags,
    });
    setBlogData(res.blogs.data);
    setPage(page - 1);
  };

  const loadAfter = async () => {
    const data = await client.request<BlogListQueryResponse, BlogListQueryVariables>(BlogListQuery, {
      limit: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      offset: page * SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      tags: filterTags,
    });
    setBlogData(data.blogs.data);
    setPage(page + 1);
  };

  if (!blogData.length) {
    return (
      <div className={styles.container}>
        <p className={styles.noItems} dangerouslySetInnerHTML={{ __html: parseTwemoji('Sorry, no items found. 😭') }} />
      </div>
    );
  }

  return (
    <>
      <ul className={styles.container}>
        {blogData.map((blog) => (
          // add timestamp to activate rendering animation
          <BlogListCard key={blog.slug + new Date().getTime()} blog={blog} />
        ))}
      </ul>
      <Pagination page={page} maxPage={maxPage} loadBefore={loadBefore} loadAfter={loadAfter} />
    </>
  );
};
