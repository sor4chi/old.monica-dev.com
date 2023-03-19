import type { ReactNode } from 'react';

import * as styles from './dashboard.css';

import { Menu } from '@/ui/navigator/menu';

interface Props {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sideWrapper}>
        <Menu />
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
