import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

import { Button } from '../button';

import * as styles from './pagination.css';

interface Props {
  page: number;
  maxPage: number;
  loadBefore: () => void;
  loadAfter: () => void;
}

export const Pagination = ({ loadAfter, loadBefore, maxPage, page }: Props) => {
  if (maxPage < 1) return null;

  return (
    <div className={styles.pagination}>
      {page > 1 && (
        <Button onClick={loadBefore} variant="secondary" icon={<MdArrowBackIos />} iconPosition="left">
          Prev
        </Button>
      )}
      {page > 1 && (
        <span className={styles.page}>
          {page} / {maxPage}
        </span>
      )}
      {page < maxPage && (
        <Button onClick={loadAfter} variant="secondary" icon={<MdArrowForwardIos />} iconPosition="right">
          Next
        </Button>
      )}
    </div>
  );
};
