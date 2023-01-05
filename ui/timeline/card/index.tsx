import clsx from 'clsx';

import { WithImage } from '#/ui/timeline/card/image';

import { TimelineContent } from '../types';

import { WithTweet } from './tweet';

interface Props {
  title?: string;
  content: TimelineContent;
}

const getTweetIdFromUrl = (url: string) => {
  const regex = /https:\/\/twitter.com\/\w+\/status\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const TimelineCard = ({ title, content }: Props) => (
  <div className={clsx('common-card', 'flex flex-col gap-4 p-4')}>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-neutral-600 dark:text-neutral-400">
      {content.content || ''}
    </p>
    {content?.type === 'IMAGE' && <WithImage img={content.img} title={title} />}
    {content?.type === 'TWEET' && (
      <WithTweet id={getTweetIdFromUrl(content.tweet) ?? ''} />
    )}
  </div>
);
