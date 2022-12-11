import clsx from 'clsx';
import Image from 'next/image';

import { TimelineProps } from '../types';

interface Props {
  timeline: TimelineProps;
}

export const TimelineCard = ({ timeline }: Props) => {
  const timelineContent = (() => {
    if (timeline.contentImg) {
      return timeline.contentImg.content;
    }
    if (timeline.contentText) {
      return timeline.contentText.content;
    }
    if (timeline.contentTweet) {
      return timeline.contentTweet.content;
    }
    if (timeline.contentLink) {
      return timeline.contentLink.content;
    }
  })();

  return (
    <div className={clsx('common-card', 'flex flex-col gap-4 p-4')}>
      <h3 className="text-xl font-bold">{timeline.title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">
        {timelineContent}
      </p>
      {timeline.contentImg && (
        <div className="relative aspect-video w-full">
          <Image
            src={timeline.contentImg.img}
            alt={timeline.title}
            fill
            className="rounded-sm object-cover"
          />
        </div>
      )}
    </div>
  );
};
