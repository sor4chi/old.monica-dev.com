import { z } from 'zod';

import * as styles from './blog.css';

import { getPublishedBlogsCount, getSomePublishedBlogs } from '@/repository/blog';
import { BlogList } from '@/ui/feature/blog/list';
import { Pagination } from '@/ui/foundation/pagination';

const ITEMS_PER_PAGE = 5;
const pageSchema = z.preprocess((v) => Number(v), z.number().min(1));

// force-dynamic for SSR, because use dynamic sort with query params
export const dynamic = 'force-dynamic';

async function getBlogs(page: number) {
  try {
    const [data, count] = await Promise.all([getSomePublishedBlogs(page, ITEMS_PER_PAGE), getPublishedBlogsCount()]);
    return {
      count,
      data,
    };
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.log(e);
    }
    return {
      count: 0,
      data: [],
    };
  }
}

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function Blog({ searchParams }: Props) {
  const pageInt = pageSchema.safeParse(searchParams.page);
  const page = pageInt.success ? pageInt.data : 1;
  const blogs = await getBlogs(page);

  return (
    <>
      <h1 className={styles.title}>Blog</h1>
      <BlogList blogs={blogs.data} />
      <Pagination
        total={Math.ceil(blogs.count / ITEMS_PER_PAGE)}
        now={page}
        hrefGenerator={(offset) => `/blog?page=${offset}`}
      />
    </>
  );
}
