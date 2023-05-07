/* eslint-disable sort/object-properties */
import {
  MdEditNote,
  MdHome,
  MdMail,
  MdOutlineEditNote,
  MdOutlineHome,
  MdOutlineMail,
  MdOutlineTimeline,
  MdTimeline,
} from 'react-icons/md';

const MENU_ITEM = {
  Home: {
    link: '/dashboard',
    isActive: (pathname: string) => pathname === '/dashboard',
    ActiveIcon: MdHome,
    DefaultIcon: MdOutlineHome,
  },
  Timeline: {
    link: '/dashboard/timeline',
    isActive: (pathname: string) => pathname === '/dashboard/timeline',
    ActiveIcon: MdTimeline,
    DefaultIcon: MdOutlineTimeline,
  },
  Blog: {
    link: '/dashboard/blog',
    isActive: (pathname: string) => pathname.startsWith('/dashboard/blog'),
    ActiveIcon: MdEditNote,
    DefaultIcon: MdOutlineEditNote,
  },
  Contact: {
    link: '/dashboard/contact',
    isActive: (pathname: string) => pathname === '/dashboard/contact',
    ActiveIcon: MdMail,
    DefaultIcon: MdOutlineMail,
  },
} as const;

type MenuItem = keyof typeof MENU_ITEM;

export const MENU_ITEM_ENTRY = Object.entries(MENU_ITEM) as [MenuItem, (typeof MENU_ITEM)[MenuItem]][];
