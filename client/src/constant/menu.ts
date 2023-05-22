/* eslint-disable sort/object-properties */

import {
  ArrowTrendingUp,
  ChatBubbleOvalLeftEllipsis,
  ChatBubbleOvalLeftEllipsisFill,
  Home,
  HomeFill,
  PencilSquare,
  PencilSquareFill,
} from '@/ui/icons';

const MENU_ITEM = {
  Home: {
    link: '/dashboard',
    isActive: (pathname: string) => pathname === '/dashboard',
    ActiveIcon: HomeFill,
    DefaultIcon: Home,
  },
  Timeline: {
    link: '/dashboard/timeline',
    isActive: (pathname: string) => pathname === '/dashboard/timeline',
    ActiveIcon: ArrowTrendingUp,
    DefaultIcon: ArrowTrendingUp,
  },
  Blog: {
    link: '/dashboard/blog',
    isActive: (pathname: string) => pathname.startsWith('/dashboard/blog'),
    ActiveIcon: PencilSquareFill,
    DefaultIcon: PencilSquare,
  },
  Contact: {
    link: '/dashboard/contact',
    isActive: (pathname: string) => pathname === '/dashboard/contact',
    ActiveIcon: ChatBubbleOvalLeftEllipsisFill,
    DefaultIcon: ChatBubbleOvalLeftEllipsis,
  },
} as const;

type MenuItem = keyof typeof MENU_ITEM;

export const MENU_ITEM_ENTRY = Object.entries(MENU_ITEM) as [MenuItem, (typeof MENU_ITEM)[MenuItem]][];
