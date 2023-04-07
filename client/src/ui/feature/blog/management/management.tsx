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

const fetchBlogs = async () => {
  const res = await clientInBrowser.request<BlogsManagementQueryResponse, BlogsManagementQueryVariables>(
    BlogManagementQuery,
    {
      limit: 10,
      offset: 0,
      tags: [],
    },
  );
  return res.blogs;
};

export const BlogsManagement = () => {
  const [blogs, setBlogs] = useState<BlogTableFragmentResponse | null>(null);
  const [page, setPage] = useState(1);

  const loadBefore = async () => {
    const res = await clientInBrowser.request<BlogsManagementQueryResponse, BlogsManagementQueryVariables>(
      BlogManagementQuery,
      {
        limit: SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
        offset: page * SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE - SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE * 2,
        tags: [],
      },
    );
    setBlogs(res.blogs);
    setPage(page - 1);
  };

  const loadAfter = async () => {
    const res = await clientInBrowser.request<BlogsManagementQueryResponse, BlogsManagementQueryVariables>(
      BlogManagementQuery,
      {
        limit: SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
        offset: page * SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
        tags: [],
      },
    );
    setBlogs(res.blogs);
    setPage(page + 1);
  };

  useEffect(() => {
    fetchBlogs().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  return <>{blogs && <BlogTable page={page} loadBefore={loadBefore} loadAfter={loadAfter} blogs={blogs} />}</>;
};
