import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { BlogTableFragmentResponse } from './table';
import { BlogTable, BlogTableFragment } from './table';

import { SITE_CONFIG } from '@/constant/site';
import { useDashboardHeader } from '@/hooks';
import { clientInBrowser, gql } from '@/lib/graphql';
import { Button } from '@/ui/foundation/button';

export const BlogAdminQuery = gql`
  ${BlogTableFragment}

  query BlogAdminQuery($limit: Int!, $offset: Int!, $tags: [String!]) {
    blogs: blogsAll(input: { limit: $limit, offset: $offset, tags: $tags }) {
      ...BlogTableFragment
    }
  }
`;

export type BlogAdminQueryResponse = {
  blogs: BlogTableFragmentResponse;
};

export type BlogAdminQueryVariables = {
  limit: number;
  offset: number;
  tags?: string[];
};

export const BlogAdmin = () => {
  const [blogs, setBlogs] = useState<BlogTableFragmentResponse | undefined>(undefined);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setDashboardHeaderContent } = useDashboardHeader();

  const loadBefore = async () => {
    setLoading(true);
    const res = await clientInBrowser
      .request<BlogAdminQueryResponse, BlogAdminQueryVariables>(BlogAdminQuery, {
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
      .request<BlogAdminQueryResponse, BlogAdminQueryVariables>(BlogAdminQuery, {
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
    setDashboardHeaderContent(<Button onClick={() => router.push('/dashboard/blog/new')}>New</Button>);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BlogTable page={page} loadBefore={loadBefore} loadAfter={loadAfter} blogs={blogs} loading={loading} />
    </>
  );
};
