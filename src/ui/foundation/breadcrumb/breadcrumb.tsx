import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment } from 'react';

import * as styles from './breadcrumb.css';

export const Breadcrumb = () => {
  const segments = useSelectedLayoutSegments();
  let link = '/dashboard';

  return (
    <div className={styles.wrapper}>
      {segments.map((segment, i) => {
        link += `/${segment}`;
        return (
          <Fragment key={i}>
            <Link className={styles.item} href={link}>
              {segment}
            </Link>
            {i < segments.length - 1 && <span className={styles.separator}>/</span>}
          </Fragment>
        );
      })}
    </div>
  );
};
