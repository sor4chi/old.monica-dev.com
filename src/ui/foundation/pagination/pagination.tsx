import clsx from 'clsx';
import Link from 'next/link';

import * as styles from './pagination.css';

interface Props {
  now: number;
  total: number;
  hrefGenerator: (offset: number) => string;
}
const ThreeDots = () => (
  <div className={styles.dots}>
    {Array(3)
      .fill(0)
      .map((_, i) => (
        <span className={styles.dot} key={i} />
      ))}
  </div>
);

/** max must be less than 3, must be odd */
const max = 5;

export const Pagination = ({ hrefGenerator, now, total }: Props) => {
  if (total <= 1) {
    return null;
  }
  if (total <= max) {
    return (
      <div className={styles.container}>
        {Array(total)
          .fill(0)
          .map((_, i) => (
            <Link
              href={hrefGenerator(i + 1)}
              key={i}
              passHref
              className={clsx(styles.link, styles.linkState[now === i + 1 ? 'active' : 'inactive'])}
            >
              {i + 1}
            </Link>
          ))}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Link
        href={hrefGenerator(1)}
        passHref
        className={clsx(styles.link, styles.linkState[now === 1 ? 'active' : 'inactive'])}
      >
        1
      </Link>
      {now - Math.floor(max / 2) > 2 && <ThreeDots />}
      {Array(max)
        .fill(0)
        .map((_, i) => {
          const offset = now + i - 2;
          if (offset < 2 || offset > total - 1) {
            return null;
          }
          return (
            <Link
              href={hrefGenerator(offset)}
              key={i}
              passHref
              className={clsx(styles.link, styles.linkState[now === offset ? 'active' : 'inactive'])}
            >
              {offset}
            </Link>
          );
        })}
      {total - now - Math.floor(max / 2) > 1 && <ThreeDots />}
      <Link
        href={hrefGenerator(total)}
        passHref
        className={clsx(styles.link, styles.linkState[now === total ? 'active' : 'inactive'])}
      >
        {total}
      </Link>
    </div>
  );
};
