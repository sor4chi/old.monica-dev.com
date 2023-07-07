'use client';
import Link from 'next/link';

import * as styles from './header.css';

import { useSession } from '@/hooks';

export const Navigation = () => {
  const authState = useSession();

  return (
    <nav>
      <ul className={styles.navigationList}>
        <li className={styles.navigationListItem}>
          <Link href="/about" passHref className={styles.navigationLink}>
            About
          </Link>
        </li>
        <li className={styles.navigationListItem}>
          <Link href="/blog" passHref className={styles.navigationLink}>
            Blog
          </Link>
        </li>
        <li className={styles.navigationListItem}>
          <Link href="/contact" passHref className={styles.navigationLink}>
            Contact
          </Link>
        </li>
        {authState === 'authenticated' && (
          <li className={styles.navigationListItem}>
            <Link href="/dashboard" passHref className={styles.navigationLink}>
              Dashboard
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
