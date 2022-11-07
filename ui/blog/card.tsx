import Link from 'next/link';

import { Blog } from '#/types/blog';
import { dateToPassedTimeByNow } from '#/utils/date';

interface Props {
  blog: Blog;
}

export const BlogCard = ({ blog }: Props) => {
  return (
    <Link
      href={blog.url || `blogs/${blog.slug}` || ''}
      className="rounded-lg text-white flex flex-col space-y-2 hover:bg-neutral-800 p-4"
    >
      <div className="text-2xl font-bold">{blog.title}</div>
      <div className="flex">
        {blog.tags}
        {/* <BlogTagList tags={blog.tags} /> */}
        <div className="text-sm">{dateToPassedTimeByNow(blog.date)}</div>
      </div>
    </Link>
  );
};
