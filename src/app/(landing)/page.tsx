import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaTwitter } from 'react-icons/fa';

import * as styles from './index.css';

import { Logo } from '@/ui/navigator/logo';
import { ThemeSwitch } from '@/ui/navigator/themeSwitch';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.themeSwitchContainer}>
        <ThemeSwitch />
      </div>
      <div className={styles.profile}>
        <Image
          src="/icon.webp"
          alt="Monica / Sor4chi"
          width={240}
          height={240}
          className={styles.icon}
          loading="eager"
        />
        <h1 className={styles.title}>
          <div className={styles.logoContainer}>
            <span className={styles.shadow} />
            <span className={styles.logo}>
              <Logo />
            </span>
          </div>
          <span className={styles.titleToggle}>
            <span>Sor4chi</span>
            <span>Monica</span>
          </span>
          <span style={{ display: 'inline' }}>Portfolio</span>
        </h1>
        <p className={styles.subtitle}>Web App Developer</p>
        <ul className={styles.social}>
          <li className={styles.socialItem}>
            <Link
              href="https://twitter.com/monica18_pr"
              target="_blank"
              className={styles.socialLink}
              passHref
              aria-label="twitter @monica18_pr"
            >
              <FaTwitter size="2rem" />
            </Link>
          </li>
          <li className={styles.socialItem}>
            <Link
              href="https://github.com/sor4chi"
              target="_blank"
              className={styles.socialLink}
              passHref
              aria-label="github sor4chi"
            >
              <FaGithub size="2rem" />
            </Link>
          </li>
        </ul>
      </div>
      <hr className={styles.divider} />
      <div className={styles.meta}>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <Link href="/about" className={styles.navLink} passHref>
              About
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link href="/blog" className={styles.navLink} passHref>
              Blog
            </Link>
          </li>
          <li className={styles.navListItem}>
            <Link href="/contact" className={styles.navLink} passHref>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
