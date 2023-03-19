import type { Metadata } from 'next';

import { MenuProvider } from '@/hooks';
import { DashboardLayout } from '@/ui/app/layout/dashboard';

import '@/style/globals.css';

export const metadata = {
  robots: 'noindex',
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard',
  },
} satisfies Metadata;

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <MenuProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </MenuProvider>
  );
}
