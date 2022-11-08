/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const NAVIGATION_ITEMS = [
  {
    label: 'Home',
    href: '/',
    active: /^\/$/,
  },
  {
    label: 'Projects',
    href: '/projects',
    active: /^\/projects(\/.*)?$/,
  },
  {
    label: 'Blogs',
    href: '/blogs',
    active: /^\/blogs(\/.*)?$/,
  },
  {
    label: 'Contact',
    href: '/contact',
    active: /^\/contact(\/.*)?$/,
  },
];
export const Navigation = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const activeBarRef = useRef<HTMLDivElement>(null);
  const activeIndex = NAVIGATION_ITEMS.findIndex((item) =>
    item.active.test(pathname || ''),
  );

  useEffect(() => {
    if (navRef.current && activeBarRef.current) {
      const activeItem = navRef.current.children[activeIndex] as HTMLElement;
      activeBarRef.current.style.width = `${activeItem?.clientWidth || 0}px`;
      activeBarRef.current.style.left = `${activeItem?.offsetLeft || 0}px`;
    }
  }, [activeIndex]);

  return (
    <nav
      className="relative space-x-4 text-neutral-800 dark:text-neutral-100 flex"
      ref={navRef}
    >
      {NAVIGATION_ITEMS.map((item) => (
        <div key={item.href}>
          <Link href={item.href}>{item.label}</Link>
        </div>
      ))}
      <span
        className={clsx(
          'bg-gradient-to-r from-orange-400 to-orange-500',
          'transition-all duration-300 ease-in-out',
          'h-1 rounded-full absolute -bottom-2 !m-0',
        )}
        ref={activeBarRef}
      />
    </nav>
  );
};
