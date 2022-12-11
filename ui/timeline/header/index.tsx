import clsx from 'clsx';
import Link from 'next/link';

import { TWITTER_ACCOUNT_NAME } from '#/constants/site';
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
      <span className="font-medium">
        {timeline.contentType === 'TWEET' && 'New Tweet posted by'}
      </span>
      {timeline.contentType === 'TWEET' && (
        <Link
          className="font-bold text-neutral-700 transition-colors hover:text-neutral-900 dark:text-gray-200 dark:hover:text-gray-100"
          href={`https://twitter.com/${TWITTER_ACCOUNT_NAME}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{TWITTER_ACCOUNT_NAME}
        </Link>
      )}
      <span className="font-medium">
        {dateToPassedTimeByNow(timeline.date)}
      </span>
    </span>
  );
};
