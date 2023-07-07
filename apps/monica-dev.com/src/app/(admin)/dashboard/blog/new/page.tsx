import type { Metadata } from 'next';

import { BlogEditor } from '@/ui/feature/blog/editor';

export const metadata = {
  title: 'Blogs - Create',
} satisfies Metadata;

export default async function BlogDetail() {
  return (
    <>
      <BlogEditor />
    </>
  );
}
