import { z } from 'zod';

import * as styles from './page.css';

import { fetchGetSomeBlog } from '@/app/api/blog/route';
import { BlogList } from '@/ui/foundation/blog/list';
import { Pagination } from '@/ui/foundation/pagination';

const ITEMS_PER_PAGE = 5;
const pageSchema = z.preprocess((v) => Number(v), z.number().min(1));

async function getBlogs(page: string) {
  try {
    const pageInt = pageSchema.parse(page);
    const res = await fetchGetSomeBlog({
      count: ITEMS_PER_PAGE,
      offset: ITEMS_PER_PAGE * (pageInt - 1),
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
  params: {
    page: string;
  };
}

export default async function Blog({ params }: Props) {
  const blogs = await getBlogs(params.page);
  const totalPage = Math.ceil(blogs?.total / ITEMS_PER_PAGE);

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>Blog</h1>
      <p className={styles.pageDisplay}>
        {params.page} / {totalPage}
      </p>
      <BlogList blogs={blogs.data} />
      <Pagination total={totalPage} now={Number(params.page)} hrefGenerator={(offset) => `/blog/page/${offset}`} />
    </article>
  );
}
