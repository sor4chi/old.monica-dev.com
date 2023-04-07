import type { TagListFragmentResponse } from '../tagList';
import { TagListFragment } from '../tagList';

import { gql } from '@/lib/graphql';

export const BlogTableRowFragment = gql`
  ${TagListFragment}
  fragment BlogTableRowFragment on Blog {
    id
    title
    createdAt
    updatedAt
    publishedAt
    tags {
      ...TagListFragment
    }
  }
`;

export type BlogTableRowFragmentResponse = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags: TagListFragmentResponse[];
};

export const BlogTableFragment = gql`
  ${BlogTableRowFragment}

  fragment BlogTableFragment on BlogList {
    data {
      ...BlogTableRowFragment
    }
    total
  }
`;

export type BlogTableFragmentResponse = {
  data: BlogTableRowFragmentResponse[];
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
