import type { AboutTimelineFragmentResponse } from '../query';
import { AboutTimelineFragment } from '../query';

import { gql } from '@/lib/graphql';

export const TimelineAdminQuery = gql`
  ${AboutTimelineFragment}

  query TimelineAdminQuery() {
    timelines {
      ...AboutTimelineFragment
    }
    blogs: blogsAll(input: { limit: 999, offset: 0, tags: [] }) {
      data {
        id
        title
      }
    }
  }
`;

export type TimelineAdminQueryResponse = {
  timelines: AboutTimelineFragmentResponse;
  blogs: {
    data: {
      id: number;
      title: string;
    }[];
  };
};

export const CreateTimelineQuery = gql`
  mutation CreateTimelineQuery($input: TimelineInput!) {
    timeline: createTimeline(input: $input) {
      id
      title
      category
      date
      blog {
        title
        slug
      }
    }
  }
`;

export type CreateTimelineMutationResponse = {
  timeline: {
    id: number;
    title: string;
    category: string;
    date: string;
    blog: {
      title: string;
      slug: string;
    } | null;
  };
};

export type CreateTimelineMutationVariables = {
  input: {
    title: string;
    relatedBlogId: number | null;
    category: string;
    date: string;
  };
};

export const UpdateTimelineQuery = gql`
  mutation UpdateTimelineQuery($id: ID!, $input: TimelineInput!) {
    timeline: updateTimeline(id: $id, input: $input) {
      id
      title
      category
      date
      blog {
        title
        slug
      }
    }
  }
`;

export type UpdateTimelineMutationResponse = {
  timeline: {
    id: number;
    title: string;
    category: string;
    date: string;
    blog: {
      title: string;
      slug: string;
    } | null;
  };
};

export type UpdateTimelineMutationVariables = {
  id: number;
  input: {
    title: string;
    relatedBlogId: number | null;
    category: string;
    date: string;
  };
};

export const DeleteTimelineQuery = gql`
  mutation DeleteTimelineQuery($id: ID!) {
    deleteTimeline(id: $id)
  }
`;

export type DeleteTimelineMutationResponse = {
  deleteTimeline: boolean;
};

export type DeleteTimelineMutationVariables = {
  id: number;
};
