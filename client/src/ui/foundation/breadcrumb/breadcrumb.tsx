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
            <Link className={styles.item} href={link}>
              {i === segments.length - 1 && last ? last : segment}
            </Link>
            {i < segments.length - 1 && <span className={styles.separator}>/</span>}
          </Fragment>
        );
      })}
    </div>
  );
};
