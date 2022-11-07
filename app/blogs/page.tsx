import { use } from 'react';

import { getOriginalBlog, getBlogByQiita, getBlogByZenn } from '#/lib/blog';
import { BlogCardList } from '#/ui/blog/card-list';

async function getData() {
  const res = await Promise.all([
    getOriginalBlog(),
    getBlogByQiita(),
    getBlogByZenn(),
  ]);
  const blogs = res.flat();
  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export default function Page() {
  const blogs = use(getData());
  return (
    <div className="max-w-3xl p-4 space-y-6 m-auto">
      <BlogCardList blogs={blogs} />
    </div>
  );
}
