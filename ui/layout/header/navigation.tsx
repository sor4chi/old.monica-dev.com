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
    label: 'Timeline',
    href: '/timeline',
    active: /^\/timeline(\/.*)?$/,
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
      className="relative flex space-x-4 text-neutral-800 transition-colors duration-300 dark:text-neutral-100"
      ref={navRef}
    >
      {NAVIGATION_ITEMS.map((item) => (
        <div key={item.href}>
          <Link href={item.href}>{item.label}</Link>
        </div>
      ))}
      <span
        className={clsx(
          'main-gradient',
          'transition-all duration-300 ease-in-out',
          'absolute -bottom-2 !m-0 h-1 rounded-full',
        )}
        ref={activeBarRef}
      />
    </nav>
  );
};
