import { gql } from 'graphql-request';
import Link from 'next/link';

import * as styles from './recommend.css';

import { Card } from '@/ui/foundation/card';
import { ChevronLeft, ChevronRight } from '@/ui/icons';

export const BlogsRecommendQuery = gql`
  query BlogsRecommendQuery($tags: [String!]) {
    blogs(input: { limit: 3, offset: 0, tags: $tags }) {
      data {
        id
        title
        slug
        description
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
      description: string;
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
          <Card padding="no">
            <Link href={`/blog/${blog.slug}`} passHref className={styles.link}>
              {i % 2 === 0 && <ChevronLeft className={styles.arrow} />}
              <div className={styles.content}>
                <h3 className={styles.title}>{blog.title}</h3>
                <p className={styles.description}>{blog.description}</p>
              </div>
              {i % 2 === 1 && <ChevronRight className={styles.arrow} />}
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
};
