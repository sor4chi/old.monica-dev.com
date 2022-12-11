'use client';

import {
  ContentImg,
  ContentLink,
  ContentText,
  ContentTweet,
  Timeline,
} from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { StringDate } from '#/types/utility';
import { dateToPassedTimeByNow } from '#/utils/date';

interface Props {
  timeline: StringDate<Timeline> & {
    contentImg: ContentImg | null;
    contentText: ContentText | null;
    contentTweet: ContentTweet | null;
    contentLink: ContentLink | null;
  };
  last?: boolean;
}

const TimelineHeader = ({ timeline }: { timeline: Props['timeline'] }) => {
  return (
    <span className={clsx('inline-flex gap-2')}>
      <span className="text-sm font-medium leading-[theme(lineHeights.timelineLabel)] text-neutral-400 dark:text-neutral-400">
        {timeline.contentType === 'TWEET' && 'New Tweet posted by'}
      </span>
      {timeline.contentType === 'TWEET' && (
        <Link
          className="text-sm font-bold leading-[theme(lineHeights.timelineLabel)] text-neutral-700 transition-colors hover:text-neutral-900 dark:text-gray-200 dark:hover:text-gray-100"
          href="https://twitter.com/monica18_pr"
          target="_blank"
          rel="noopener noreferrer"
        >
          @monica18_pr
        </Link>
      )}
      <span className="text-sm font-medium leading-[theme(lineHeights.timelineLabel)] text-neutral-400 dark:text-neutral-400">
        {dateToPassedTimeByNow(timeline.date)}
      </span>
    </span>
  );
};

export const TimelineCard = ({ timeline, last }: Props) => {
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
    <div className={clsx(`ml-[theme(sizes.timelineBarAreaWidth)]`, 'relative')}>
      {last || (
        <span
          className={clsx(
            `h-[calc(100%_+_theme(sizes.timelineCardGap))] w-[theme(sizes.timelineBarWidth)]`,
            'block bg-neutral-700 dark:bg-gray-400',
            `left-[calc(-1_*_(theme(sizes.timelineBarAreaWidth)_/_2_+_theme(sizes.timelineBarWidth)_/_2))]`,
            'top-[calc(theme(lineHeights.timelineLabel)_/_2)]',
            'absolute',
          )}
        />
      )}
      <span
        className={clsx(
          `h-[theme(sizes.timelinePoint)] w-[theme(sizes.timelinePoint)]`,
          'block rounded-full bg-neutral-700 dark:bg-gray-400',
          `left-[calc(-1_*_(theme(sizes.timelineBarAreaWidth)_/_2_+_theme(sizes.timelinePoint)_/_2))]`,
          'top-[calc(theme(lineHeights.timelineLabel)_/_2_-_theme(sizes.timelinePoint)_/_2)]',
          'absolute',
          'border-2 border-slate-100 transition-colors dark:border-neutral-900',
        )}
      />
      <div className="flex flex-col">
        <TimelineHeader timeline={timeline} />
        <div className={clsx('common-card', 'flex flex-col gap-4 p-4')}>
          <h3 className="text-xl font-bold">{timeline.title}</h3>
          {timelineContent}
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
      </div>
    </div>
  );
};
