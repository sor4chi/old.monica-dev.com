import clsx from 'clsx';
import { gql } from 'graphql-request';
import Link from 'next/link';

import * as styles from './recommend.css';

import { ChevronLeft, ChevronRight } from '@/ui/icons';

export const BlogsRecommendQuery = gql`
  query BlogsRecommendQuery($tags: [String!]) {
    blogs(input: { limit: 3, offset: 0, tags: $tags }) {
      data {
        id
        title
        slug
      }
    }
  }
`;

export type BlogsRecommendQueryResponse = {
  blogs: {
    data: {
      id: number;
      title: string;
      slug: string;
    }[];
  };
};

export type BlogsRecommendQueryVariables = {
  tags: string[];
};

interface Props {
  recommends: BlogsRecommendQueryResponse['blogs']['data'];
  id: number;
}

export const BlogsRecommend = ({ id, recommends }: Props) => {
  const recommendBlogs = recommends.filter((blog) => blog.id !== id);
  return (
    <div className={styles.container}>
      {recommendBlogs.length === 0 && <p className={styles.empty}>No recommend blogs</p>}
      {recommendBlogs.map((blog, i) => (
        <div key={blog.id} className={styles.item}>
          <Link
            href={`/blog/${blog.slug}`}
            passHref
            className={clsx(styles.link, styles[i % 2 === 0 ? 'left' : 'right'])}
          >
            {i % 2 === 0 && <ChevronLeft className={styles.arrow} />}
            <span className={styles.content}>
              <span className={styles.label[i % 2 === 0 ? 'left' : 'right']}>{i % 2 === 0 ? 'Prev' : 'Next'}</span>
              <span className={styles.title}>{blog.title}</span>
            </span>
            {i % 2 === 1 && <ChevronRight className={styles.arrow} />}
          </Link>
        </div>
      ))}
    </div>
  );
};
