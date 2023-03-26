import { GraphQLClient } from 'graphql-request';

import { clientEnv } from '@/env/client';

export { gql } from 'graphql-request';

export const client = new GraphQLClient(clientEnv.NEXT_PUBLIC_GQL_ENDPOINT, {
  fetch: (url: string, options: RequestInit) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   options.headers = {
    //     ...options.headers,
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    return fetch(url, {
      ...options,
      cache: 'no-cache',
    });
  },
});
