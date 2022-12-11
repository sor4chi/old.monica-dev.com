import clsx from 'clsx';
import { use } from 'react';

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
  return timelines.map((timeline) => ({
    ...timeline,
    createdAt: timeline.date.toISOString(),
    updatedAt: timeline.date.toISOString(),
    date: timeline.date.toISOString(),
  }));
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
