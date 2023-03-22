import * as styles from './dashboard-header.css';

import { Breadcrumb } from '@/ui/foundation/breadcrumb';

export const DashboardHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Breadcrumb />
      </div>
      <hr className={styles.divider} />
    </header>
  );
};
