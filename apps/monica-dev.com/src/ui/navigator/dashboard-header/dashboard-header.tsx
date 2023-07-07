import { useRouter } from 'next/navigation';

import * as styles from './dashboard-header.css';

import { useDashboardHeader, useSession } from '@/hooks';
import { Breadcrumb } from '@/ui/foundation/breadcrumb';

export const DashboardHeader = () => {
  const { dashboardHeaderContent, title } = useDashboardHeader();
  const authState = useSession();
  const router = useRouter();

  if (authState === 'unauthenticated') {
    router.push('/login');
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Breadcrumb last={title} />
        <div className={styles.content}>{dashboardHeaderContent}</div>
      </div>
      <hr className={styles.divider} />
    </header>
  );
};
