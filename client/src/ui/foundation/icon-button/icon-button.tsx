import clsx from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

import * as styles from './icon-button.css';

type Props = ComponentProps<'button'> & {
  children: ReactNode;
  label: string;
  variant?: 'action' | 'danger';
};

export const IconButton = ({ children, label, variant = 'action', ...props }: Props) => {
  return (
    <button className={clsx(styles.button,
      variant === 'action' && styles.buttonAction,
      variant === 'danger' && styles.buttonDanger

    )} {...props} aria-label={label}>
      {children}
    </button>
  );
};
