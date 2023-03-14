import clsx from 'clsx';

import { TimelineCard } from './card';
import { TimelineHeader } from './header';
import { TimelineLine } from './line';
import { TimelinePoint } from './point';
import { TimelineProps } from './types';

interface Props {
  timeline: TimelineProps;
  last?: boolean;
}

export const TimelineItem = ({ timeline, last }: Props) => {
  if (timeline.content === undefined) return null;
  return (
    <div className={clsx(`ml-[theme(sizes.timelineBarAreaWidth)]`, 'relative')}>
      {last || <TimelineLine />}
      <TimelinePoint content={timeline.content} />
      <div className="flex flex-col">
        <TimelineHeader timeline={timeline} />
        <TimelineCard title={timeline.title} content={timeline.content} />
      </div>
    </div>
  );
};
