import { use } from 'react';

import { prisma } from '#/lib/prisma';
import { BlogCardList } from '#/ui/blog/card-list';

async function getData() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    include: { tags: true, provider: true },
    orderBy: { updatedAt: 'desc' },
  });
  return blogs.map((blog) => ({
    ...blog,
    createdAt: blog.createdAt.toISOString(),
    updatedAt: blog.updatedAt.toISOString(),
  }));
}

export default function Page() {
  const blogs = use(getData());
  return (
    <div className="m-auto max-w-3xl space-y-6 p-4">
      <BlogCardList blogs={blogs} />
    </div>
  );
}
