import type { BlogListCardFragmentResponse } from './card';
import { BlogListCardFragment } from './card';

import { gql } from '@/lib/graphql';

export const BlogListFragment = gql`
  ${BlogListCardFragment}

  fragment BlogListFragment on BlogList {
    data {
      ...BlogListCardFragment
    }
    total
  }
`;

export type BlogListFragmentResponse = {
  data: BlogListCardFragmentResponse[];
  total: number;
};

export const BlogListQuery = gql`
  query BlogListQuery($limit: Int!, $offset: Int!, $tags: [String!]) {
    blogs(input: { limit: $limit, offset: $offset, tags: $tags }) {
      ...BlogListFragment
    }
  }
  ${BlogListFragment}
`;

export type BlogListQueryResponse = {
  blogs: BlogListFragmentResponse;
};

export type BlogListQueryVariables = {
  limit: number;
  offset: number;
  tags?: string[];
};
