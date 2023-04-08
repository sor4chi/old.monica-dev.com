import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment } from 'react';

import * as styles from './breadcrumb.css';

interface Props {
  last?: string;
}

export const Breadcrumb = ({ last }: Props) => {
  const segments = useSelectedLayoutSegments();
  let link = '/dashboard';

  return (
    <div className={styles.wrapper}>
      {segments.map((segment, i) => {
        link += `/${segment}`;
        return (
          <Fragment key={i}>
            {i === segments.length - 1 ? (
              <span className={styles.itemText}>{last || segment}</span>
            ) : (
              <Link className={styles.itemLink} href={link}>
                {segment}
              </Link>
            )}
            {i < segments.length - 1 && <span className={styles.separator}>/</span>}
          </Fragment>
        );
      })}
    </div>
  );
};
