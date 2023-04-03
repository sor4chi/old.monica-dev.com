import type { TagListFragmentResponse } from '../tagList';
import { TagListFragment } from '../tagList';

import { gql } from '@/lib/graphql';

export const BlogTableFragment = gql`
  ${TagListFragment}

  fragment BlogTableFragment on BlogList {
    data {
      id
      title
      createdAt
      updatedAt
      publishedAt
      tags {
        ...TagListFragment
      }
    }
    total
  }
`;

export type BlogTableFragmentResponse = {
  data: {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    tags: TagListFragmentResponse[];
  }[];
  total: number;
};

export const BlogTableQuery = gql`
  ${BlogTableFragment}

  query BlogTableQuery($limit: Int!, $offset: Int!, $tags: [String!]) {
    blogs(input: { limit: $limit, offset: $offset, tags: $tags }) {
      ...BlogTableFragment
    }
  }
`;

export type BlogTableQueryResponse = {
  blogs: BlogTableFragmentResponse;
};

export type BlogTableQueryVariables = {
  limit: number;
  offset: number;
  tags?: string[];
};
