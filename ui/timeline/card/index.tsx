import clsx from 'clsx';
import Image from 'next/image';

import { TimelineContent } from '../types';

import { TwitterEmbed } from './tweet';

interface Props {
  title?: string;
  content: TimelineContent;
}

const getTweetIdFromUrl = (url: string) => {
  const regex = /https:\/\/twitter.com\/\w+\/status\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const TimelineCard = ({ title, content }: Props) => {
  const tweetId =
    content?.type === 'TWEET' ? getTweetIdFromUrl(content.tweet) : null;

  return (
    <div className={clsx('common-card', 'flex flex-col gap-4 p-4')}>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">
        {content.content || ''}
      </p>
      {content?.type === 'IMAGE' && (
        <div className="relative aspect-video w-full">
          <Image
            src={content.img}
            alt={title || ''}
            fill
            className="rounded-sm object-cover"
          />
        </div>
      )}
      {tweetId && <p>asadadsadas</p>}
      {tweetId && <TwitterEmbed id={tweetId} />}
    </div>
  );
};
