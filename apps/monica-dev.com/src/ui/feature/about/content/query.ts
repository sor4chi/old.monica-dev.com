import type { AboutTimelineFragmentResponse } from './../timeline/query';
import { AboutTimelineFragment } from './../timeline/query';

import { gql } from '@/lib/graphql';

export const AboutContentFragment = gql`
  ${AboutTimelineFragment}

  fragment AboutContentFragment on Timeline {
    ...AboutTimelineFragment
  }
`;

export type AboutContentFragmentResponse = AboutTimelineFragmentResponse;
