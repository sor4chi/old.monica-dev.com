import { useRouter } from 'next/navigation';

import * as styles from './dashboard-header.css';

import { useDashboardHeader, useSession } from '@/hooks';
import { Breadcrumb } from '@/ui/foundation/breadcrumb';

export const DashboardHeader = () => {
  const { dashboardHeaderContent } = useDashboardHeader();
  const authState = useSession();
  const router = useRouter();

  if (authState === 'unauthenticated') {
    router.push('/login');
  }

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
