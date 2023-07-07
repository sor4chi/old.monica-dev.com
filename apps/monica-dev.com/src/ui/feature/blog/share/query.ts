import { gql } from '@/lib/graphql';

export const BlogShareFragment = gql`
  fragment BlogShareFragment on Blog {
    id
    title
    slug
  }
`;

export type BlogShareFragmentResponse = {
  id: number;
  title: string;
  slug: string;
};
