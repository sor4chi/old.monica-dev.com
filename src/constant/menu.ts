/* eslint-disable sort/object-properties */
import { MdEditNote, MdHome, MdMail, MdOutlineEditNote, MdOutlineHome, MdOutlineMail } from 'react-icons/md';

export const MENU_ITEM = {
  Home: {
    link: '/dashboard',
    ActiveIcon: MdHome,
    DefaultIcon: MdOutlineHome,
  },
  Blog: {
    link: '/dashboard/blog',
    ActiveIcon: MdEditNote,
    DefaultIcon: MdOutlineEditNote,
  },
  Contact: {
    link: '/dashboard/contact',
    ActiveIcon: MdMail,
    DefaultIcon: MdOutlineMail,
  },
} as const;

export type MenuItem = keyof typeof MENU_ITEM;

export const MENU_ITEM_LIST = Object.keys(MENU_ITEM) as MenuItem[];
export const MENU_ITEM_ENTRY = Object.entries(MENU_ITEM) as [MenuItem, (typeof MENU_ITEM)[MenuItem]][];
