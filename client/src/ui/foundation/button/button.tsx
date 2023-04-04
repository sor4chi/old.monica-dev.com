import { clsx } from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

import * as styles from './button.css';

type Props = ComponentProps<'button'> & {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
};

export const Button = ({
  children,
  icon,
  iconPosition = 'left',
  size = 'md',
  variant = 'primary',
  ...props
}: Props) => {
  const Icon = icon && <span className={styles.icon}>{icon}</span>;
  return (
    <button className={clsx(styles.button, styles.variant[variant], styles.size[size])} {...props}>
      {iconPosition == 'left' && Icon}
      <span>{children}</span>
      {iconPosition == 'right' && Icon}
    </button>
  );
};
