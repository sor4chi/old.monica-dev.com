import type { Metadata } from 'next';

import * as styles from './blog.css';

import { SITE_CONFIG } from '@/constant/site';
import { serverEnv } from '@/env/server';
import { getPublishedBlogsCount, getSomePublishedBlogs } from '@/repository/blog';
import { BlogList } from '@/ui/feature/blog/list';
import { Pagination } from '@/ui/foundation/pagination';

interface Props {
  searchParams: {
    page?: string;
    tags?: string;
  };
}

// force-dynamic for SSR, because use dynamic sort with query params
export const dynamic = 'force-dynamic';

async function getBlogs(page: number, tags: string[]) {
  try {
    const [data, count] = await Promise.all([
      getSomePublishedBlogs(page, tags, SITE_CONFIG.BLOG_LENGTH_PER_PAGE),
      getPublishedBlogsCount(tags),
    ]);

    return {
      count,
      data,
    };
  } catch (e) {
    if (serverEnv.NODE_ENV === 'development') {
      console.log(e);
    }
    return {
      count: 0,
      data: [],
    };
  }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const page = parseInt(searchParams.page ?? '1');
  const tags = searchParams.tags?.split(',') ?? [];

  return {
    title: ['Blog', ...(tags.length > 0 ? [`(${tags.join(', ')})`] : []), ...(page > 1 ? [`- Page ${page}`] : [])].join(
      ' ',
    ),
  };
}

export default async function Blog({ searchParams }: Props) {
  const page = parseInt(searchParams.page ?? '1');
  const tags = searchParams.tags?.split(',') ?? [];

  const blogs = await getBlogs(page, tags);

  const paginationHrefGenerator = (offset: number) => {
    const params = new URLSearchParams();
    params.append('page', offset.toString());
    if (tags.length > 0) {
      params.append('tags', tags.join(','));
    }
    return `/blog?${params.toString()}`;
  };

  return (
    <>
      <h1 className={styles.title}>Blog</h1>
      <BlogList blogs={blogs.data} tagsHrefGenerator={(tag) => `/blog?tags=${tag}`} />
      <Pagination
        total={Math.ceil(blogs.count / SITE_CONFIG.BLOG_LENGTH_PER_PAGE)}
        now={page}
        hrefGenerator={paginationHrefGenerator}
      />
    </>
  );
}
