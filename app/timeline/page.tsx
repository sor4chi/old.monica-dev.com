import clsx from 'clsx';
import { use } from 'react';

import { TIMELINE_KINDS } from '#/constants/timeline';
import { prisma } from '#/lib/prisma';
import { TimelineItem } from '#/ui/timeline/container';

async function getData() {
  const timelines = await prisma.timeline.findMany({
    include: {
      contentImg: true,
      contentText: true,
      contentTweet: true,
      contentLink: true,
    },
    orderBy: { date: 'desc' },
  });

  const formattedTimelines = timelines.map(
    ({ contentImg, contentText, contentTweet, contentLink, ...timeline }) => {
      const content = (() => {
        if (contentImg) {
          return {
            type: TIMELINE_KINDS.IMAGE,
            ...contentImg,
          };
        }
        if (contentTweet) {
          return {
            type: TIMELINE_KINDS.TWEET,
            ...contentTweet,
          };
        }
        if (contentLink) {
          return {
            type: TIMELINE_KINDS.LINK,
            ...contentLink,
          };
        }
        if (contentText) {
          return {
            type: TIMELINE_KINDS.TEXT,
            ...contentText,
          };
        }
      })();

      return {
        ...timeline,
        content,
        createdAt: timeline.date.toISOString(),
        updatedAt: timeline.date.toISOString(),
        date: timeline.date.toISOString(),
      };
    },
  );

  return formattedTimelines;
}

export default function Page() {
  const timelines = use(getData());
  return (
    <div
      className={clsx(
        'm-auto max-w-3xl p-4',
        'space-y-[theme(sizes.timelineCardGap)]',
      )}
    >
      {timelines.map((timeline, i) => (
        <TimelineItem
          key={i}
          timeline={timeline}
          last={i === timelines.length - 1}
        />
      ))}
    </div>
  );
}
