import type { ReactNode } from 'react';

import * as styles from './dashboard.css';

import { DashboardHeader } from '@/ui/navigator/dashboard-header';
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
      <div>
        <DashboardHeader />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};
