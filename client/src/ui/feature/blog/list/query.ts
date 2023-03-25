import type { TagListFragmentResponse } from '../tagList';
import { TagListFragment } from '../tagList';

import { gql } from '@/lib/graphql';

export const BlogListFragment = gql`
  ${TagListFragment}

  fragment BlogListFragment on BlogConnection {
    edges {
      node {
        title
        slug
        description
        createdAt
        tags {
          ...TagListFragment
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
  }
`;

export type BlogListFragmentResponse = {
  edges: {
    node: {
      title: string;
      slug: string;
      description: string;
      createdAt: Date;
      tags: TagListFragmentResponse[];
    };
  }[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string;
    startCursor: string;
  };
};

export const BlogListBeforeQuery = gql`
  query BlogListBeforeQuery($last: Int!, $before: Cursor!) {
    blogs(last: $last, before: $before, orderBy: { field: CREATED_AT, direction: DESC }) {
      ...BlogListFragment
    }
  }
  ${BlogListFragment}
`;

export type BlogListBeforeQueryResponse = {
  blogs: BlogListFragmentResponse;
};

export type BlogListBeforeQueryVariables = {
  last: number;
  before: string;
};

export const BlogListAfterQuery = gql`
  query BlogListAfterQuery($first: Int!, $after: Cursor!) {
    blogs(first: $first, after: $after, orderBy: { field: CREATED_AT, direction: DESC }) {
      ...BlogListFragment
    }
  }
  ${BlogListFragment}
`;

export type BlogListAfterQueryResponse = {
  blogs: BlogListFragmentResponse;
};

export type BlogListAfterQueryVariables = {
  first: number;
  after: string;
};
