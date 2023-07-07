import { gql } from '@/lib/graphql';
import type { TimelineListFragmentResponse } from '@/ui/foundation/timeline';
import { TimelineListFragment } from '@/ui/foundation/timeline';

export const AboutTimelineFragment = gql`
  ${TimelineListFragment}

  fragment AboutTimelineFragment on Timeline {
    ...TimelineListFragment
  }
`;

export type AboutTimelineFragmentResponse = TimelineListFragmentResponse;
