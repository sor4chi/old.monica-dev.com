import * as styles from './timeline-list.css';

import type { TimelineItemFragmentResponse } from '.';
import { TimelineItem, TimelineItemFragment } from '.';

import { gql } from '@/lib/graphql';

export const TimelineListFragment = gql`
  ${TimelineItemFragment}

  fragment TimelineListFragment on Timeline {
    ...TimelineItemFragment
  }
`;

export type TimelineListFragmentResponse = TimelineItemFragmentResponse[];

interface Props {
  timelines: TimelineListFragmentResponse;
}

export const TimelineList = ({ timelines }: Props) => {
  return (
    <div className={styles.timelineList}>
      {timelines.map((timeline, index) => (
        <TimelineItem key={index} timelineItem={timeline} isLast={index === timelines.length - 1} />
      ))}
    </div>
  );
};
