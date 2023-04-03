import { GraphQLClient } from 'graphql-request';
import { cookies } from 'next/headers';

import { clientEnv } from '@/env/client';

export { gql } from 'graphql-request';

export const clientSSR = new GraphQLClient(clientEnv.NEXT_PUBLIC_GQL_ENDPOINT, {
  fetch: (url: string, options: RequestInit) => {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token.value}`,
      };
    }

    return fetch(url, {
      ...options,
      cache: 'no-cache',
    });
  },
});
