import Link from 'next/link';

import { Logo } from '../logo';
import { ThemeSwitch } from '../themeSwitch';

import * as styles from './header.css';
import { Navigation } from './navigation';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" passHref aria-label="jump to top page">
          <Logo />
        </Link>
        <div className={styles.left}>
          <Navigation />
          <ThemeSwitch />
        </div>
      </div>
      <hr className={styles.divider} />
    </header>
  );
};
