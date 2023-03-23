import * as styles from './dashboard-header.css';

import { useDashboardHeader } from '@/hooks';
import { Breadcrumb } from '@/ui/foundation/breadcrumb';

export const DashboardHeader = () => {
  const { dashboardHeaderContent } = useDashboardHeader();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Breadcrumb />
        <div className={styles.content}>{dashboardHeaderContent}</div>
      </div>
      <hr className={styles.divider} />
    </header>
  );
};
