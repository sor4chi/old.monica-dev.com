import { useEffect, useState } from 'react';

import { clientEnv } from '@/env/client';

type State = 'authenticated' | 'unauthenticated' | 'loading';

export const useSession = () => {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    checkAuth().then((isAuthenticated) => {
      setState(isAuthenticated ? 'authenticated' : 'unauthenticated');
    });
  }, []);

  return state;
};

const checkAuth = async () => {
  const res = await fetch(clientEnv.NEXT_PUBLIC_GQL_ENDPOINT.replace('/query', '/me'), {
    credentials: 'include',
    method: 'POST',
  });

  if (res.ok) {
    return true;
  } else {
    return false;
  }
};
