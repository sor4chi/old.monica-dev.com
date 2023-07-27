'use client';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useCallback } from 'react';

import { BACKWARD_TRANSITION_TRIGGER, FORWARD_TRANSITION_TRIGGER } from '@/components/layout/Main/Main.css';
import { useTransitionRouterPush } from '@/hooks/use-transition-router-push';

const LINK_TRANSITION_TRIGGERS = {
  backward: BACKWARD_TRANSITION_TRIGGER,
  forward: FORWARD_TRANSITION_TRIGGER,
} as const;

type Props = ComponentProps<typeof Link> & {
  animation?: keyof typeof LINK_TRANSITION_TRIGGERS;
};

export const TransitionLink = ({ animation, children, href, onClick, ...props }: Props) => {
  const { routerPushWithTransition } = useTransitionRouterPush();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
      if (animation) {
        const transitionTrigger = LINK_TRANSITION_TRIGGERS[animation];
        document.body.classList.add(transitionTrigger);
        setTimeout(() => {
          document.body.classList.remove(transitionTrigger);
        }, 500);
      }
      const to = e.currentTarget.href;
      routerPushWithTransition(to);
    },
    [routerPushWithTransition, onClick, animation],
  );

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
