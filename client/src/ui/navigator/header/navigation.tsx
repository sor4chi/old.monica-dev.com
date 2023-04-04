import { cookies } from 'next/headers';
import Link from 'next/link';
import { MdOpenInNew } from 'react-icons/md';

import * as styles from './header.css';

export const Navigation = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

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
        {token && (
          <li className={styles.navigationListItem}>
            <Link href="/dashboard" passHref className={styles.navigationLink}>
              Dashboard <MdOpenInNew />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
