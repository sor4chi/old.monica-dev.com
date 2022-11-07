import Link from 'next/link';

import { Blog } from '#/types/blog';
import { dateToPassedTimeByNow } from '#/utils/date';

import { BlogTagList } from './tag-list';

interface Props {
  blog: Blog;
}

export const BlogCard = ({ blog }: Props) => {
  return (
    <Link
      href={blog.url || `blogs/${blog.slug}` || ''}
      className="rounded-lg dark:text-white text-neutral-800 flex flex-col space-y-2 dark:hover:bg-neutral-800 hover:bg-slate-200 p-4"
    >
      <div className="text-2xl font-bold">{blog.title}</div>
      <div className="flex justify-between items-center">
        <BlogTagList tags={blog.tags} />
        <div className="text-sm">{dateToPassedTimeByNow(blog.date)}</div>
      </div>
    </Link>
  );
};
