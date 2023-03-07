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
  const Item = ({ offset }: { offset: number }) =>
    now === offset ? (
      <span className={clsx(styles.link, styles.linkState['active'])}>{offset}</span>
    ) : (
      <Link href={hrefGenerator(offset)} passHref className={clsx(styles.link, styles.linkState['inactive'])}>
        {offset}
      </Link>
    );

  if (total <= max) {
    return (
      <div className={styles.container}>
        {Array(total)
          .fill(0)
          .map((_, i) => (
            <Item key={i} offset={i + 1} />
          ))}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Item offset={1} />
      {now - Math.floor(max / 2) > 2 && <ThreeDots />}
      {Array(max)
        .fill(0)
        .map((_, i) => {
          const offset = now + i - 2;
          if (offset < 2 || offset > total - 1) {
            return null;
          }
          return <Item key={i} offset={offset} />;
        })}
      {total - now - Math.floor(max / 2) > 1 && <ThreeDots />}
      <Item offset={total} />
    </div>
  );
};
