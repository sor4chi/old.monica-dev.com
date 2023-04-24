import * as styles from './timeline-list.css';

import { TimelineItem } from '.';

interface Timeline {
  date: string;
  title: string;
  category: string;
  blog?: {
    title: string;
    slug: string;
  };
}

interface Props {
  timelines: Timeline[];
}

export const TimelineList = ({ timelines }: Props) => {
  return (
    <div className={styles.timelineList}>
      {timelines.map((timeline, index) => (
        <TimelineItem key={index} {...timeline} isLast={index === timelines.length - 1} />
      ))}
    </div>
  );
};
