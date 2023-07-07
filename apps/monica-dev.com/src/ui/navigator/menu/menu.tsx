import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { Logo } from '../logo';
import { ThemeSwitch } from '../themeSwitch';

import * as styles from './menu.css';

import { MENU_ITEM_ENTRY } from '@/constant/menu';
import { clientEnv } from '@/env/client';
import { Button } from '@/ui/foundation/button';

export const Menu = () => {
  const pathname = usePathname() ?? '';
  const router = useRouter();

  const logout = async () => {
    const res = await fetch(clientEnv.NEXT_PUBLIC_GQL_ENDPOINT.replace('/query', '/logout'), {
      credentials: 'include',
      method: 'POST',
    });

    if (res.ok) {
      router.push('/login');
    } else {
      console.error('logout failed');
    }
  };

  return (
    <>
      <aside className={styles.wrapper}>
        <Link className={styles.logoContainer} passHref href="/">
          <Logo />
          Monica.log
        </Link>
        <div className={styles.menu}>
          {MENU_ITEM_ENTRY.map(([label, { ActiveIcon, DefaultIcon, isActive, link }]) => (
            <Link className={styles.menuItem[isActive(pathname) ? 'active' : 'default']} key={label} href={link}>
              <span className={styles.icon}>{isActive(pathname) ? <ActiveIcon /> : <DefaultIcon />}</span>
              <span>{label}</span>
            </Link>
          ))}
        </div>
        <div className={styles.footer}>
          <ThemeSwitch />
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};
