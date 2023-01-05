import clsx from 'clsx';

import { TweetEmbed } from '#/ui/embed/tweet';

interface Props {
  id: string;
}

export const WithTweet = ({ id }: Props) => (
  <div
    className={clsx(
      'flex w-full items-center justify-center rounded-md',
      'bg-slate-100 dark:bg-neutral-900',
      'transition-colors duration-300',
    )}
  >
    <TweetEmbed id={id} />
  </div>
);
