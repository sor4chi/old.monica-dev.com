import type { BlogTableRowFragmentResponse } from './row';
import { BlogTableRow, BlogTableRowFragment, BlogTableRowSkeleton } from './row';
import { TABLE_ROW_WITH_RATIO, TABLE_ROWS, TOTAL_RATIO } from './statics';

import { SITE_CONFIG } from '@/constant/site';
import { gql } from '@/lib/graphql';
import { Pagination } from '@/ui/foundation/pagination';
import { FT } from '@/ui/foundation/table';

export const BlogTableFragment = gql`
  ${BlogTableRowFragment}

  fragment BlogTableFragment on BlogList {
    data {
      ...BlogTableRowFragment
    }
    total
  }
`;

export type BlogTableFragmentResponse = {
  data: BlogTableRowFragmentResponse[];
  total: number;
};

interface Props {
  blogs?: BlogTableFragmentResponse;
  page: number;
  loadBefore: () => void;
  loadAfter: () => void;
  loading: boolean;
}

export const BlogTable = ({ blogs, loadAfter, loadBefore, loading, page }: Props) => {
  return (
    <>
      <FT.Table>
        <FT.Head>
          <FT.Row>
            {TABLE_ROWS.map((row) => (
              <FT.Header key={row} style={{ width: `${(TABLE_ROW_WITH_RATIO[row] / TOTAL_RATIO) * 100}%` }}>
                {row}
              </FT.Header>
            ))}
          </FT.Row>
        </FT.Head>
        <FT.Body>
          {loading || blogs === undefined
            ? new Array(SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE).fill(0).map((_, i) => <BlogTableRowSkeleton key={i} />)
            : blogs.data.map((blog) => <BlogTableRow key={blog.id} blog={blog} />)}
        </FT.Body>
      </FT.Table>
      <Pagination
        page={page}
        maxPage={blogs ? Math.ceil(blogs.total / SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE) : 1}
        loadBefore={loadBefore}
        loadAfter={loadAfter}
      />
    </>
  );
};
