import type { Metadata } from 'next';

import { BlogAdmin } from '@/ui/feature/blog/admin';

export const metadata = {
  title: 'Blogs',
} satisfies Metadata;

export default async function BlogAdminPage() {
  return (
    <>
      <BlogAdmin />
    </>
  );
}
