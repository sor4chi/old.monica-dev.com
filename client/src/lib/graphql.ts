import { GraphQLClient } from 'graphql-request';

import { clientEnv } from '@/env/client';

export { gql } from 'graphql-request';

export const client = new GraphQLClient(clientEnv.NEXT_PUBLIC_GQL_ENDPOINT, {
  credentials: 'include',
  fetch: (url: string, options: RequestInit) => {
    return fetch(url, {
      ...options,
      cache: 'no-cache',
    });
  },
  mode: 'cors',
});
