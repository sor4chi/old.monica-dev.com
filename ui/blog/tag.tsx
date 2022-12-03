import clsx from 'clsx';

interface Props {
  tag: string;
}

export const BlogTag = ({ tag }: Props) => {
  return (
    <div
      className={clsx(
        'text-neutral-600  hover:bg-neutral-600 hover:text-neutral-100',
        'dark:text-neutral-400 hover:dark:text-neutral-700 hover:dark:bg-neutral-100',
        'text-sm rounded-md px-2 py-0.5',
      )}
    >
      #{tag}
    </div>
  );
};
