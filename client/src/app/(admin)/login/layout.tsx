import type { Metadata } from 'next';

import * as styles from './login.css';

import { VanillaLayout } from '@/ui/app/layout/vanilla';

export const metadata = {
  robots: 'noindex',
  title: 'Login',
} satisfies Metadata;

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <VanillaLayout>
      <div className={styles.container}>{children}</div>
    </VanillaLayout>
  );
}
