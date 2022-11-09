import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Card = ({ children }: Props) => {
  return (
    <div
      className={clsx(
        'border-[1.5px] rounded-lg flex p-4 transition-[border] duration-300 ease-in-out',
        'text-neutral-800 bg-slate-50 border-white hover:border-orange-500',
        'dark:text-slate-200 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-orange-500',
      )}
    >
      {children}
    </div>
  );
};
