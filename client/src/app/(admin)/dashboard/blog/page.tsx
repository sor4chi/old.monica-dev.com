import type { Metadata } from 'next';

import { SITE_CONFIG } from '@/constant/site';
import { clientSSR, gql } from '@/lib/graphql-ssr';
import { BlogTable } from '@/ui/feature/blog/table';
import type { BlogTableFragmentResponse } from '@/ui/feature/blog/table/query';
import { BlogTableFragment } from '@/ui/feature/blog/table/query';

interface Props {
  searchParams: {
    tags?: string;
  };
}

export const metadata = {
  title: 'Blogs',
} satisfies Metadata;

const BlogListPageQuery = gql`
  ${BlogTableFragment}

  query BlogListQuery($limit: Int!, $offset: Int!, $tags: [String!]) {
    blogs(input: { limit: $limit, offset: $offset, tags: $tags }) {
      ...BlogTableFragment
    }
  }
`;

type BlogListPageQueryResponse = {
  blogs: BlogTableFragmentResponse;
};

type BlogListPageQueryVariables = {
  limit: number;
  offset: number;
  tags: string[];
};

async function getData(tags: string[]) {
  const res = await clientSSR.request<BlogListPageQueryResponse, BlogListPageQueryVariables>(BlogListPageQuery, {
    limit: SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
    offset: 0,
    tags,
  });

  return res.blogs;
}

export default async function BlogList({ searchParams }: Props) {
  const tags = searchParams.tags?.split(',') ?? [];
  const blogs = await getData(tags);

  return (
    <>
      <BlogTable blogs={blogs} />
    </>
  );
}
