import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  np?: boolean;
}

export const Card = ({ children }: Props) => {
  return (
    <div
      className={clsx(
        'common-card',
        'flex p-4 hover:border-orange-500 dark:hover:border-orange-500',
      )}
    >
      {children}
    </div>
  );
};
