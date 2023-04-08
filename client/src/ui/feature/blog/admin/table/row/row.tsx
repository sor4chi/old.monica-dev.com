import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

import type { TagListFragmentResponse } from '../../../tagList';
import { TagList, TagListFragment } from '../../../tagList';
import type { TableRowKeys } from '../statics';
import { TABLE_ROWS } from '../statics';

import * as styles from './row.css';

import { gql } from '@/lib/graphql';
import { Badge } from '@/ui/foundation/badge';
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
    publishedAt: blog.publishedAt ? <Badge variant="info">Published</Badge> : <Badge variant="danger">Draft</Badge>,
    tags: <TagList tags={blog.tags} hrefGenerator={(tag) => `/dashboard/blog?tag=${tag}`} />,
    title: blog.title,
    updatedAt: formatDateNumeric(blog.updatedAt),
  } satisfies Record<TableRowKeys, ReactNode>;

  return TABLE_ROWS.map((row) => <FT.Data key={row}>{MAP[row]}</FT.Data>);
};

interface Props {
  blog: BlogTableRowFragmentResponse;
}

export const BlogTableRow = ({ blog }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/blog/${blog.id}`);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <FT.Row key={blog.id} onClick={handleClick} onKeyPress={handleEnter} tabIndex={0} area-label={blog.title}>
      {getTableRowFromBlog(blog)}
    </FT.Row>
  );
};

export const BlogTableRowSkeleton = () => {
  return (
    <FT.Row>
      {TABLE_ROWS.map((row) => (
        <FT.Data key={row}>
          <div className={styles.skeletonStyle} />
        </FT.Data>
      ))}
    </FT.Row>
  );
};
