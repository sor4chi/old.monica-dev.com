import * as styles from './blog.css';

import { fetchGetSomeBlog } from '@/app/api/blog/route';
import { BlogList } from '@/ui/foundation/blog/list';
import { Pagination } from '@/ui/foundation/pagination';

const ITEMS_PER_PAGE = 5;

async function getBlogs() {
  try {
    const res = await fetchGetSomeBlog({
      count: ITEMS_PER_PAGE,
      offset: 0,
    });
    return res;
  } catch (e) {
    process.env.NODE_ENV === 'development' && console.error(e);
    return {
      data: [],
      total: 0,
    };
  }
}

export default async function Blog() {
  const blogs = await getBlogs();

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>Blog Page</h1>
      <BlogList blogs={blogs.data} />
      <Pagination
        total={Math.ceil(blogs?.total / ITEMS_PER_PAGE)}
        now={1}
        hrefGenerator={(offset) => `/blog/page/${offset}`}
      />
    </article>
  );
}
