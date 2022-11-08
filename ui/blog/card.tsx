import clsx from 'clsx';
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
      className={clsx(
        'border-2 rounded-lg flex flex-col space-y-2 p-4',
        'text-neutral-800 bg-slate-50 border-white',
        'dark:text-slate-200 dark:bg-neutral-800 dark:border-neutral-700',
      )}
    >
      <div className="text-xl font-bold">{blog.title}</div>
      <div className="flex justify-between items-center">
        <BlogTagList tags={blog.tags} />
        <div className="text-sm text-neutral-400 dark:text-neutral-500">
          {dateToPassedTimeByNow(blog.date)}
        </div>
      </div>
    </Link>
  );
};
