import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import { Button } from '../button';

import * as styles from './pagination.css';

import { gql } from '@/lib/graphql';

export const PaginationFragment = gql`
  fragment PaginationFragment on PageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
`;

export type PaginationFragmentResponse = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
};

interface Props {
  page: number;
  maxPage: number;
  loadBefore: (startCursor: string) => void;
  loadAfter: (endCursor: string) => void;
  pageInfo: PaginationFragmentResponse;
}

export const Pagination = ({ loadAfter, loadBefore, maxPage, page, pageInfo }: Props) => (
  <div className={styles.pagination}>
    {pageInfo.hasPreviousPage && (
      <Button onClick={() => loadBefore(pageInfo.startCursor)} variant="secondary">
        <MdArrowBackIos />
        Prev
      </Button>
    )}
    {page > 1 && (
      <span className={styles.page}>
        {page} / {maxPage}
      </span>
    )}
    {pageInfo.hasNextPage && (
      <Button onClick={() => loadAfter(pageInfo.endCursor)} variant="secondary">
        Next
        <MdArrowForwardIos />
      </Button>
    )}
  </div>
);
