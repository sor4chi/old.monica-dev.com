import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'shared-ui';

import * as styles from './index.css';

import { VanillaLayout } from '@/ui/app/layout/vanilla';
import { SocialList } from '@/ui/feature/account/socialList';
import { Logo } from '@/ui/navigator/logo';

export default function Home() {
  return (
    <VanillaLayout>
      <Button />
      <div className={styles.container}>
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
            {/* <span style={{ display: 'inline' }}>Portfolio</span> */}
          </h1>
          <p className={styles.subtitle}>Web App Developer</p>
          <SocialList />
        </div>
        <hr className={styles.divider} />
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
    </VanillaLayout>
  );
}
