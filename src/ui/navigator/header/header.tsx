import Link from 'next/link';

import { Logo } from '../logo';

import * as styles from './header.css';

import { ThemeSwitch } from '@/ui/navigator/themeSwitch';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" passHref aria-label="jump to top page">
          <Logo />
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
            <li className={styles.navigationListItem}>
              <Link href="/contact" passHref className={styles.navigationLink}>
                Contact
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
