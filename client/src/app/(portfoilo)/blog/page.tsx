import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import * as styles from './blog.css';

import { SITE_CONFIG } from '@/constant/site';
import { client, gql } from '@/lib/graphql';
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

  query BlogListPageQuery($first: Int!, $tagWhereInput: [TagWhereInput!]) {
    blogs(first: $first, orderBy: { field: CREATED_AT, direction: DESC }, where: { hasTagsWith: $tagWhereInput }) {
      ...BlogListFragment
    }
  }
`;

type BlogListPageQueryResponse = {
  blogs: BlogListFragmentResponse;
};

type BlogListPageQueryVariables = {
  first: number;
  tagWhereInput: {
    slugIn: string[];
  } | null;
};

async function getBlogs(tags: string[]) {
  try {
    const data = await client.request<BlogListPageQueryResponse, BlogListPageQueryVariables>(BlogListPageQuery, {
      first: SITE_CONFIG.BLOG_LENGTH_PER_PAGE,
      tagWhereInput: tags.length ? { slugIn: tags } : null,
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
      <BlogList relay={blogs.data.blogs} filterTags={tags} />
    </>
  );
}
