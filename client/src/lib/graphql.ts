import { GraphQLClient } from 'graphql-request';

import { clientEnv } from '@/env/client';

export { gql } from 'graphql-request';

export const client = new GraphQLClient(clientEnv.NEXT_PUBLIC_SERVER_GQL_ENDPOINT, {
  credentials: 'include',
});

export const clientInBrowser = new GraphQLClient(clientEnv.NEXT_PUBLIC_GQL_ENDPOINT, {
  credentials: 'include',
});
