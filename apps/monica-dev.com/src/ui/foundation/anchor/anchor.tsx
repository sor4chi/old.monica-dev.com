import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

import * as styles from './anchor.css';

type Props = ComponentPropsWithoutRef<'a'> & {
  href: string;
};

export const Anchor = ({ children, href, ...rest }: Props) => {
  if (href.startsWith('/')) {
    return (
      <Link href={href} passHref {...rest} className={styles.anchor}>
        {children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a href={href} {...rest} className={styles.anchor}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest} className={styles.anchor}>
      {children}
    </a>
  );
};
