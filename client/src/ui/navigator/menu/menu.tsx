import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '../logo';

import * as styles from './menu.css';

import { MENU_ITEM_ENTRY } from '@/constant/menu';

export const Menu = () => {
  const pathname = usePathname();

  return (
    <>
      <aside className={styles.wrapper}>
        <div className={styles.logoContainer}>
          <Logo />
          Monica.log
        </div>
        <div className={styles.menu}>
          {MENU_ITEM_ENTRY.map(([label, { ActiveIcon, DefaultIcon, isActive, link }]) => (
            <Link className={styles.menuItem[isActive(pathname) ? 'active' : 'default']} key={label} href={link}>
              {isActive(pathname) ? <ActiveIcon /> : <DefaultIcon />}
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};
