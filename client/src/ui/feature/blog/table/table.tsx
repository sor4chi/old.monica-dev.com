import type { BlogTableRowFragmentResponse } from './row';
import { BlogTableRow, BlogTableRowFragment } from './row';
import { TABLE_ROW } from './statics';

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
  blogs: BlogTableFragmentResponse;
  page: number;
  loadBefore: () => void;
  loadAfter: () => void;
}

export const BlogTable = ({ blogs, loadAfter, loadBefore, page }: Props) => {
  const maxPage = Math.ceil(blogs.total / SITE_CONFIG.BLOG_TABLE_ITEM_PER_PAGE);

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
          {blogs.data.map((blog) => (
            <BlogTableRow key={blog.id} blog={blog} />
          ))}
        </FT.Body>
      </FT.Table>
      <Pagination page={page} maxPage={maxPage} loadBefore={loadBefore} loadAfter={loadAfter} />
    </>
  );
};
