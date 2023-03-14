import { BlogTag as TBlogTag } from '@prisma/client';
import clsx from 'clsx';

interface Props {
  tag: TBlogTag;
}

export const BlogTag = ({ tag }: Props) => {
  return (
    <div
      className={clsx(
        'text-neutral-600  hover:bg-neutral-600 hover:text-neutral-100',
        'dark:text-neutral-400 hover:dark:bg-neutral-100 hover:dark:text-neutral-700',
        'rounded-md px-2 py-0.5 text-sm',
      )}
    >
      #{tag.name}
    </div>
  );
};
