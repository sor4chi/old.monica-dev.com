'use client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { IoIosFastforward, IoMdArrowForward, IoMdOpen } from 'react-icons/io';

import { Blog } from '#/types/blog';
import { dateToPassedTimeByNow } from '#/utils/date';

import { BlogTagList } from './tag-list';

interface Props {
  blog: Blog;
}

export const BlogCard = ({ blog }: Props) => {
  const iconUrl = useMemo(() => {
    if (blog.type === 'zenn') return '/zenn.svg';
    if (blog.type === 'qiita') return '/qiita.png';
    return '/original.svg';
  }, [blog.type]);

  const [onHover, setOnHover] = useState(false);

  return (
    <Link
      href={blog.url || `blogs/${blog.slug}` || ''}
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}
      className={clsx(
        'border-[1.5px] rounded-lg flex space-y-2 p-4',
        'text-neutral-800 bg-slate-50 border-white',
        'dark:text-slate-200 dark:bg-neutral-800 dark:border-neutral-700',
      )}
    >
      <div
        className={clsx(
          'w-max h-max mr-4 rounded-lg float-left border-[1.5px] relative overflow-hidden',
          'bg-slate-100 border-white',
          'dark:bg-neutral-900 dark:border-neutral-700',
        )}
      >
        <div className="p-4">
          <Image src={iconUrl} alt="icon" width={24} height={24} />
        </div>
        <div
          className={clsx(
            'w-full h-full left-0 top-0 flex justify-center items-center absolute backdrop-blur-sm',
            onHover ? 'opacity-100' : 'opacity-0',
          )}
        >
          {blog.type !== 'original' ? <IoMdOpen /> : <IoMdArrowForward />}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-xl font-bold">{blog.title}</div>
        <div className="flex justify-between items-center">
          <BlogTagList tags={blog.tags} />
          <div className="text-sm text-neutral-400 dark:text-neutral-500">
            {dateToPassedTimeByNow(blog.date)}
          </div>
        </div>
      </div>
    </Link>
  );
};
