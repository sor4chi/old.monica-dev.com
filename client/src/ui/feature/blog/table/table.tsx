import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { TagList } from '../tagList';

import type {
  BlogTableFragmentResponse,
  BlogTableQueryResponse,
  BlogTableQueryVariables,
  BlogTableRowFragmentResponse,
} from './query';
import { BlogTableQuery } from './query';

import { SITE_CONFIG } from '@/constant/site';
import { client } from '@/lib/graphql';
import { Pagination } from '@/ui/foundation/pagination';
import { FT } from '@/ui/foundation/table';
import { formatDateNumeric } from '@/util/date';

const TABLE_ROW = ['title', 'createdAt', 'updatedAt', 'publishedAt', 'tags'] as const;
type TableRowKeys = (typeof TABLE_ROW)[number];

const getTableRowFromBlog = (blog: BlogTableRowFragmentResponse) => {
  const MAP = {
    createdAt: formatDateNumeric(blog.createdAt),
    publishedAt: blog.publishedAt ? `✅ ${formatDateNumeric(blog.publishedAt)}` : '❌',
    tags: <TagList tags={blog.tags} hrefGenerator={(tag) => `/dashboard/blog?tag=${tag}`} />,
    title: blog.title,
    updatedAt: formatDateNumeric(blog.updatedAt),
  } satisfies Record<TableRowKeys, ReactNode>;

  return TABLE_ROW.map((row) => <FT.Data key={row}>{MAP[row]}</FT.Data>);
};

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
      <FT.Table>
        <FT.Head>
          <FT.Row>
            {TABLE_ROW.map((row) => (
              <FT.Header key={row}>{row}</FT.Header>
            ))}
          </FT.Row>
        </FT.Head>
        <FT.Body>
          {blogData.map((blog) => (
            <FT.Row key={blog.id} onClick={() => router.push(`/dashboard/blog/${blog.id}`)}>
              {getTableRowFromBlog(blog)}
            </FT.Row>
          ))}
        </FT.Body>
      </FT.Table>
      <Pagination page={page} maxPage={maxPage} loadBefore={loadBefore} loadAfter={loadAfter} />
    </>
  );
};
