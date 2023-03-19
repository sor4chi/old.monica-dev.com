import Link from 'next/link';

import { Logo } from '../logo';

import * as styles from './menu.css';

import { MENU_ITEM_ENTRY } from '@/constant/menu';
import { useMenu } from '@/hooks';

export const Menu = () => {
  const { menuActive } = useMenu();

  return (
    <>
      <aside className={styles.wrapper}>
        <div className={styles.logoContainer}>
          <Logo />
          Monica.log
        </div>
        <div className={styles.menu}>
          {MENU_ITEM_ENTRY.map(([label, { ActiveIcon, DefaultIcon, link }]) => (
            <Link className={styles.menuItem[menuActive === label ? 'active' : 'default']} key={label} href={link}>
              {menuActive === label ? <ActiveIcon /> : <DefaultIcon />}
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};
