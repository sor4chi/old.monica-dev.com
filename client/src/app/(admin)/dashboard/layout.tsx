import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { DashboardHeaderProvider } from '@/hooks';
import { DashboardLayout } from '@/ui/app/layout/dashboard';

export const metadata = {
  robots: 'noindex',
  title: {
    default: 'Dashboard',
    template: '%s | Dashboard',
  },
} satisfies Metadata;

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) {
    redirect('/login');
  }

  return (
    <DashboardHeaderProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardHeaderProvider>
  );
}
