import { createClient } from 'urql';

import { clientEnv } from '@/env/client';

export const client = createClient({
  fetchOptions: () => {
    const token = process.env.NEXT_PUBLIC_ANON_KEY;
    return {
      headers: {
        apikey: token ? token : '',
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  },
  url: clientEnv.NEXT_PUBLIC_GQL_ENDPOINT,
});
