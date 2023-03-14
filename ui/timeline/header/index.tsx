import clsx from 'clsx';

import { PostHeader } from '#/ui/timeline/header/post';
import { TweetHeader } from '#/ui/timeline/header/tweet';
import { TimelineProps } from '#/ui/timeline/types';
import { dateToPassedTimeByNow } from '#/utils/date';

interface Props {
  timeline: TimelineProps;
}

export const TimelineHeader = ({ timeline }: Props) => {
  return (
    <span
      className={clsx(
        'inline-flex gap-2',
        'text-sm leading-[theme(lineHeights.timelineLabel)] text-neutral-400',
      )}
    >
      {timeline.content?.type === 'TWEET' && <TweetHeader />}
      {timeline.content?.type !== 'TWEET' && <PostHeader />}
      <span className="font-medium">
        {dateToPassedTimeByNow(timeline.date)}
      </span>
    </span>
  );
};
