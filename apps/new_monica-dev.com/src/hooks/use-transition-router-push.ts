import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useViewTransition } from './use-view-transition';

export const useTransitionRouterPush = () => {
  const router = useRouter();
  const routerPush = useCallback(
    async (to: string) => {
      router.push(to);
      await new Promise((resolve) => setTimeout(resolve, 100));
    },
    [router],
  );
  const { startViewTransition: routerPushWithTransition } = useViewTransition(routerPush);

  return { routerPushWithTransition };
};
