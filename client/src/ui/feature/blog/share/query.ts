import { gql } from '@/lib/graphql';

export const BlogShareFragment = gql`
  fragment BlogShareFragment on Blog {
    id
    title
  }
`;

export type BlogShareFragmentResponse = {
  id: number;
  title: string;
};
