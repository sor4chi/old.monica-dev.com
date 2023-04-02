import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import * as styles from './blog.css';

import { SITE_CONFIG } from '@/constant/site';
import { clientSSR, gql } from '@/lib/graphql-ssr';
import { BlogList } from '@/ui/feature/blog/list';
import type { BlogListFragmentResponse } from '@/ui/feature/blog/list/query';
import { BlogListFragment } from '@/ui/feature/blog/list/query';

interface Props {
  searchParams: {
    tags?: string;
  };
}

// force-dynamic for SSR, because use dynamic sort with query params
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';
export const preferredRegion = 'home';

const BlogListPageQuery = gql`
  ${BlogListFragment}

  query BlogListQuery($limit: Int!, $offset: Int!, $tags: [String!]) {
    blogs(input: { limit: $limit, offset: $offset, tags: $tags }) {
      ...BlogListFragment
    }
  }
`;

type BlogListPageQueryResponse = {
  blogs: BlogListFragmentResponse;
};

type BlogListPageQueryVariables = {
  limit: number;
  offset: number;
  tags: string[];
};

async function getBlogs(tags: string[]) {
  try {
    const data = await clientSSR.request<BlogListPageQueryResponse, BlogListPageQueryVariables>(BlogListPageQuery, {
      limit: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      offset: 0,
      tags,
    });

    return {
      data,
    };
  } catch (e) {
    console.error(e);
    notFound();
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const tags = searchParams.tags?.split(',') ?? [];

  return {
    title: ['Blog', ...(tags.length > 0 ? [`(${tags.join(', ')})`] : [])].join(' '),
  };
}

export default async function Blog({ searchParams }: Props) {
  const tags = searchParams.tags?.split(',') ?? [];

  const blogs = await getBlogs(tags);

  return (
    <>
      <h1 className={styles.title}>Blog</h1>
      <BlogList blogs={blogs.data.blogs} filterTags={tags} />
    </>
  );
}
