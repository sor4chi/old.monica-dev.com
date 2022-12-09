import clsx from 'clsx';
import { use } from 'react';

import { parseMarkdownToHTML } from '#/lib/markdown';
import { getTimelines } from '#/lib/timeline';
import { TimelineCard } from '#/ui/timeline/card';

async function getData() {
  const res = await Promise.all([getTimelines()]);
  const timelines = res.flat();
  return timelines
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((timeline) => ({
      ...timeline,
      md: parseMarkdownToHTML(timeline.content),
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
        <TimelineCard
          key={i}
          timeline={timeline}
          last={i === timelines.length - 1}
        />
      ))}
    </div>
  );
}
