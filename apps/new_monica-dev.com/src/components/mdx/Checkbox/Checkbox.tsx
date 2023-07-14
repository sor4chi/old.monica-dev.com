import { clsx } from 'clsx';
import type { ComponentProps } from 'react';

import { styles } from './Checkbox.css';

export const Checkbox = ({ className, disabled: _, ...props }: ComponentProps<'input'>) => {
  return <input type="checkbox" {...props} readOnly className={clsx(styles.checkbox, className)} />;
};
