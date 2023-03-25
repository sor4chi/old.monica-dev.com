import { clsx } from 'clsx';
import type { ComponentProps } from 'react';

import * as styles from './button.css';

type Props = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary';
};

export const Button = ({ variant = 'primary', ...props }: Props) => {
  return <button className={clsx(styles.button, styles.variant[variant])} {...props} />;
};
