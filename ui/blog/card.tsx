'use client';
import { Blog, BlogProvider, BlogTag } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoMdArrowForward, IoMdOpen } from 'react-icons/io';

import { StringDate } from '#/types/utility';
import { dateToPassedTimeByNow } from '#/utils/date';

import { BlogTagList } from './tag-list';

interface Props {
  blog: StringDate<Blog> & {
    provider: BlogProvider | null;
    tags: BlogTag[];
  };
}

export const BlogCard = ({ blog }: Props) => {
  const [onHover, setOnHover] = useState(false);

  return (
    <Link
      href={blog.providerId ? blog.content : `/blogs/${blog.slug}`}
      target={blog.providerId ? '_blank' : undefined}
      onMouseOver={() => setOnHover(true)}
      onMouseOut={() => setOnHover(false)}
    >
      <div
        className={clsx(
          'common-card',
          'flex p-4 hover:border-orange-500 dark:hover:border-orange-500',
        )}
      >
        <div
          className={clsx(
            'relative float-left mr-4 h-max w-max overflow-hidden rounded-lg border-[1.5px]',
            'border-white bg-slate-100',
            'dark:border-neutral-700 dark:bg-neutral-900',
            'transition-colors duration-300',
          )}
        >
          <div className="p-4">
            <Image
              src={blog.provider?.favicon || '/original.svg'}
              alt="icon"
              width={24}
              height={24}
            />
          </div>
          <div
            className={clsx(
              'absolute left-0 top-0 flex h-full w-full items-center justify-center backdrop-blur-sm  transition-opacity duration-300 ease-in-out',
              onHover ? 'opacity-100' : 'opacity-0',
            )}
          >
            {blog.providerId ? <IoMdOpen /> : <IoMdArrowForward />}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{blog.title}</h1>
          <div className="mt-2 flex flex-wrap items-end justify-between">
            <BlogTagList tags={blog.tags} />
            <div className="float-right clear-both text-sm text-neutral-400 dark:text-neutral-600">
              {dateToPassedTimeByNow(blog.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
