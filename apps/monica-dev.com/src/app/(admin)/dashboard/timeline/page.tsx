import type { Metadata } from 'next';

import { TimelineAdmin } from '@/ui/feature/about/timeline/admin';

export const metadata = {
  title: 'Timelines',
} satisfies Metadata;

export default async function TimelineAdminPage() {
  return (
    <>
      <TimelineAdmin />
    </>
  );
}
