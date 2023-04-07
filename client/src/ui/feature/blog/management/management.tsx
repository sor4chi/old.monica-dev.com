import { useEffect, useState } from 'react';

import type { BlogTableFragmentResponse } from '../table';
import { BlogTable, BlogTableFragment } from '../table';

import { SITE_CONFIG } from '@/constant/site';
import { clientInBrowser, gql } from '@/lib/graphql';

export const BlogManagementQuery = gql`
  ${BlogTableFragment}

  query BlogTableQuery($limit: Int!, $offset: Int!, $tags: [String!]) {
    blogs(input: { limit: $limit, offset: $offset, tags: $tags }) {
      ...BlogTableFragment
    }
  }
`;

export type BlogsManagementQueryResponse = {
  blogs: BlogTableFragmentResponse;
};

export type BlogsManagementQueryVariables = {
  limit: number;
  offset: number;
  tags?: string[];
};

export const BlogsManagement = () => {
  const [blogs, setBlogs] = useState<BlogTableFragmentResponse | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadBefore = async () => {
    setLoading(true);
    const res = await clientInBrowser
      .request<BlogsManagementQueryResponse, BlogsManagementQueryVariables>(BlogManagementQuery, {
        limit: SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
        offset: page * SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE - SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE * 2,
        tags: [],
      })
      .finally(() => {
        setLoading(false);
      });
    setBlogs(res.blogs);
    setPage(page - 1);
  };

  const loadAfter = async () => {
    setLoading(true);
    const res = await clientInBrowser
      .request<BlogsManagementQueryResponse, BlogsManagementQueryVariables>(BlogManagementQuery, {
        limit: SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
        offset: page * SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
        tags: [],
      })
      .finally(() => {
        setLoading(false);
      });
    setBlogs(res.blogs);
    setPage(page + 1);
  };

  useEffect(() => {
    loadAfter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BlogTable page={page} loadBefore={loadBefore} loadAfter={loadAfter} blogs={blogs} loading={loading} />
    </>
  );
};
