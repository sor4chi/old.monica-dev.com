'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IoIosSunny, IoIosMoon } from 'react-icons/io';

export const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setIsDarkMode(
      localStorage.getItem('theme') === 'dark' ||
        document.documentElement.classList.contains('dark'),
    );
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="h-10 w-10 cursor-pointer overflow-hidden rounded-lg bg-white hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
      <div
        onClick={() => toggleDarkMode()}
        className={clsx(
          'flex w-fit flex-col items-center transition-transform duration-500 ease-in-out',
          isDarkMode || '-translate-y-1/2',
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center">
          <IoIosMoon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="flex h-10 w-10 items-center justify-center">
          <IoIosSunny className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </div>
  );
};
