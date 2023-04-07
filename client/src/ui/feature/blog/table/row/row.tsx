import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import type { TagListFragmentResponse } from '../../tagList';
import { TagList, TagListFragment } from '../../tagList';
import type { TableRowKeys } from '../statics';
import { TABLE_ROW } from '../statics';

import { gql } from '@/lib/graphql';
import { FT } from '@/ui/foundation/table';
import { formatDateNumeric } from '@/util/date';

export const BlogTableRowFragment = gql`
  ${TagListFragment}

  fragment BlogTableRowFragment on Blog {
    id
    title
    createdAt
    updatedAt
    publishedAt
    tags {
      ...TagListFragment
    }
  }
`;

export type BlogTableRowFragmentResponse = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags: TagListFragmentResponse[];
};

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
  blog: BlogTableRowFragmentResponse;
}

export const BlogTableRow = ({ blog }: Props) => {
  const router = useRouter();

  return (
    <FT.Row key={blog.id} onClick={() => router.push(`/dashboard/blog/${blog.id}`)}>
      {getTableRowFromBlog(blog)}
    </FT.Row>
  );
};
