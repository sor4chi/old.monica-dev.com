import Link from 'next/link';
import twemoji from 'twemoji';

import { TagList } from '../tagList';

import * as styles from './list.css';

import { Text } from '@/ui/foundation/text';
import { formatYMD } from '@/util/date';

type Tag = {
  name: string;
  slug: string;
};

interface Blog {
  slug: string;
  tags: Tag[];
  title: string;
  description: string;
  createdAt: Date;
}

interface Props {
  blogs: Blog[];
}

const NOTFOUND_MSG = twemoji.parse('Sorry, no items found. 😭', {
  className: 'twemoji',
  ext: '.svg',
  folder: 'svg',
});

export const BlogList = ({ blogs }: Props) => {
  if (!blogs.length) {
    return (
      <div className={styles.container}>
        <p className={styles.noItems} dangerouslySetInnerHTML={{ __html: NOTFOUND_MSG }} />
      </div>
    );
  }

  return (
    <ul className={styles.container}>
      {blogs.map((blog) => (
        <li key={blog.slug} className={styles.item}>
          <time className={styles.date}>{formatYMD(blog.createdAt)}</time>
          <Link href={`/blog/${blog.slug}`} className={styles.link} passHref>
            <h2 className={styles.title}>
              <Text value={blog.title} />
            </h2>
            <p className={styles.description}>{blog.description}</p>
          </Link>
          <TagList tags={blog.tags} />
        </li>
      ))}
    </ul>
  );
};
