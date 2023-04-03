import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { TagList } from '../tagList';

import type { BlogTableFragmentResponse, BlogTableQueryResponse, BlogTableQueryVariables } from './query';
import { BlogTableQuery } from './query';
import * as styles from './table.css';

import { SITE_CONFIG } from '@/constant/site';
import { client } from '@/lib/graphql';
import { Pagination } from '@/ui/foundation/pagination';
import { formatYYYYMMDD } from '@/util/date';

interface Props {
  blogs: BlogTableFragmentResponse;
}

export const BlogTable = ({ blogs }: Props) => {
  const router = useRouter();
  const [blogData, setBlogData] = useState(blogs.data);
  const [page, setPage] = useState(1);

  const maxPage = Math.ceil(blogs.total / SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE);

  const loadBefore = async () => {
    const res = await client.request<BlogTableQueryResponse, BlogTableQueryVariables>(BlogTableQuery, {
      limit: SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
      offset: page * SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE - SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE * 2,
      tags: [],
    });
    setBlogData(res.blogs.data);
    setPage(page - 1);
  };

  const loadAfter = async () => {
    const data = await client.request<BlogTableQueryResponse, BlogTableQueryVariables>(BlogTableQuery, {
      limit: SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
      offset: page * SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE,
      tags: [],
    });
    setBlogData(data.blogs.data);
    setPage(page + 1);
  };

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>title</th>
            <th className={styles.th}>createdAt</th>
            <th className={styles.th}>updatedAt</th>
            <th className={styles.th}>publishedAt</th>
            <th className={styles.th}>tags</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {blogData.map((blog) => (
            <tr key={blog.id} className={styles.tr} onClick={() => router.push(`/dashboard/blog/${blog.id}`)}>
              <td className={styles.td}>{blog.title}</td>
              <td className={styles.td}>{formatYYYYMMDD(blog.createdAt)}</td>
              <td className={styles.td}>{formatYYYYMMDD(blog.updatedAt)}</td>
              <td className={styles.td}>{blog.publishedAt ? formatYYYYMMDD(blog.publishedAt) : '-'}</td>
              <td className={styles.td}>
                <TagList tags={blog.tags} hrefGenerator={(tag) => `/tag/${tag}`} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} maxPage={maxPage} loadBefore={loadBefore} loadAfter={loadAfter} />
    </>
  );
};
