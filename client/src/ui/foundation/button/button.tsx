import { clsx } from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

import * as styles from './button.css';

type Props = ComponentProps<'button'> & {
  icon?: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
};

export const Button = ({ children, icon, size = 'md', variant = 'primary', ...props }: Props) => {
  return (
    <button className={clsx(styles.button, styles.variant[variant], styles.size[size])} {...props}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
