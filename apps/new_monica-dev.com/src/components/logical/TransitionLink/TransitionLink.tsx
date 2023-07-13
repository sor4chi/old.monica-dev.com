'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useCallback } from 'react';

import { useTransitionRouterPush } from '@/hooks/use-transition-router-push';

type Props = ComponentProps<typeof Link>;

export const TransitionLink = ({ children, href, onClick, ...props }: Props) => {
  const { routerPushWithTransition } = useTransitionRouterPush();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }

      const to = e.currentTarget.href;
      routerPushWithTransition(to);
    },
    [routerPushWithTransition, onClick],
  );

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
