import * as styles from './blog.css';

import { fetchGetSomeBlog } from '@/app/api/blog/route';
import { BlogList } from '@/ui/foundation/blog/list';

async function getData() {
  try {
    const res = await fetchGetSomeBlog({
      count: 5,
      offset: 0,
    });
    return res;
  } catch (e) {
    process.env.NODE_ENV === 'development' && console.error(e);
    return [];
  }
}

export default async function Blog() {
  const data = await getData();

  return (
    <article className={styles.container}>
      <h1 className={styles.title}>Blog Page</h1>
      <BlogList blogs={data} />
    </article>
  );
}
