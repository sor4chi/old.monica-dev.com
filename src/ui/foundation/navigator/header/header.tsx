import Image from 'next/image';
import Link from 'next/link';

import * as styles from './header.css';

import { ThemeSwitch } from '@/ui/foundation/navigator/themeSwitch';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" passHref aria-label="jump to top page">
          <Image src="/logo.svg" alt="logo" width={32} height={32} className={styles.logo} />
        </Link>
        <div className={styles.spacer} />
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
          </ul>
        </nav>
        <ThemeSwitch />
      </div>
      <hr className={styles.divider} />
    </header>
  );
};
