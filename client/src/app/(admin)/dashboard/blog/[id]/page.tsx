import type { Metadata } from 'next';

import { BlogEditor } from '@/ui/feature/blog/editor';

interface Props {
  params: {
    id: string;
  };
}

export const metadata = {
  title: 'Blogs - Edit',
} satisfies Metadata;

export default async function BlogDetail({ params }: Props) {
  return (
    <>
      <BlogEditor id={params.id} />
    </>
  );
}
