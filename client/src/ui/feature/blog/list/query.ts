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
    totalCount
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
  totalCount: number;
};

export const BlogListQuery = gql`
  query BlogListQuery($first: Int, $last: Int, $before: Cursor, $after: Cursor, $tagWhereInput: [TagWhereInput!]) {
    blogs(
      first: $first
      last: $last
      before: $before
      after: $after
      orderBy: { field: CREATED_AT, direction: DESC }
      where: { hasTagsWith: $tagWhereInput }
    ) {
      ...BlogListFragment
    }
  }
  ${BlogListFragment}
`;

export type BlogListQueryResponse = {
  blogs: BlogListFragmentResponse;
};

export type BlogListQueryVariables = {
  first: number | null;
  last: number | null;
  before: string | null;
  after: string | null;
  tagWhereInput: { slugIn: string[] } | null;
};
