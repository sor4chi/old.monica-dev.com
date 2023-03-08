import { z } from 'zod';

import * as styles from './blog.css';

import { fetchGetSomeBlog } from '@/app/api/blog/route';
import { BlogList } from '@/ui/foundation/blog/list';
import { Pagination } from '@/ui/foundation/pagination';

const ITEMS_PER_PAGE = 5;
const pageSchema = z.preprocess((v) => Number(v), z.number().min(1));

async function getBlogs(page: number) {
  try {
    const res = await fetchGetSomeBlog({
      count: ITEMS_PER_PAGE,
      offset: ITEMS_PER_PAGE * (page - 1),
    });
    return res;
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.log(e);
    }
    return {
      data: [],
      total: 0,
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
        total={Math.ceil(blogs.total / ITEMS_PER_PAGE)}
        now={page}
        hrefGenerator={(offset) => `/blog?page=${offset}`}
      />
    </>
  );
}
