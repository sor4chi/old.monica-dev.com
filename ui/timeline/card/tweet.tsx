import clsx from 'clsx';
import { Suspense } from 'react';

import { TweetEmbed } from '#/ui/embed/tweet';

interface Props {
  url: string;
}

const getTweetIdFromUrl = (url: string) => {
  const regex = /https:\/\/twitter.com\/\w+\/status\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const WithTweet = ({ url }: Props) => (
  <div
    className={clsx(
      'flex w-full items-center justify-center rounded-md',
      'bg-slate-100 dark:bg-neutral-900',
      'transition-colors duration-300',
    )}
  >
    <Suspense fallback={<div>Loading...</div>}>
      {/* @ts-expect-error Async Server Component */}
      <TweetEmbed id={getTweetIdFromUrl(url) ?? ''} />
    </Suspense>
  </div>
);
