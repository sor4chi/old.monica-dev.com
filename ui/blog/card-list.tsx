import { Blog, BlogProvider, BlogTag } from '@prisma/client';

import { StringDate } from '#/types/utility';
import { BlogCard } from '#/ui/blog/card';

interface Props {
  blogs: (StringDate<Blog> & {
    provider: BlogProvider | null;
    tags: BlogTag[];
  })[];
}

export const BlogCardList = ({ blogs }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <BlogCard blog={blog} key={blog.id} />
      ))}
    </div>
  );
};
