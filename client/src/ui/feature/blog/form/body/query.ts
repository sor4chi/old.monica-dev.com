import { gql } from '@/lib/graphql-ssr';

export const TagFormFragment = gql`
  fragment TagFormFragment on Tag {
    id
    name
    slug
  }
`;

export const BlogFormFragment = gql`
  ${TagFormFragment}

  fragment BlogFormFragment on Blog {
    id
    slug
    title
    description
    content
    publishedAt
    tags {
      ...TagFormFragment
    }
  }
`;

export type TagFormFragmentResponse = {
  id: number;
  name: string;
  slug: string;
};

export type BlogFormFragmentResponse = {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string | null;
  tags: TagFormFragmentResponse[];
};
