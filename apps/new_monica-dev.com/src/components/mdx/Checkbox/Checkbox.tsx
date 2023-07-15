import { clsx } from 'clsx';
import type { ComponentProps } from 'react';

import { styles } from './Checkbox.css';

export const Checkbox = ({ className, disabled: _1, tabIndex: _2, ...props }: ComponentProps<'input'>) => {
  return <input type="checkbox" {...props} tabIndex={-1} readOnly className={clsx(styles.checkbox, className)} />;
};
