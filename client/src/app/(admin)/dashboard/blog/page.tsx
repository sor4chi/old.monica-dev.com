import type { Metadata } from 'next';

import { BlogsManagement } from '@/ui/feature/blog/management';

export const metadata = {
  title: 'Blogs',
} satisfies Metadata;

export default async function BlogManagement() {
  return (
    <>
      <BlogsManagement />
    </>
  );
}
