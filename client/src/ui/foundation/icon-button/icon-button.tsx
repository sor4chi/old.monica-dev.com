import type { ComponentProps, ReactNode } from 'react';

import * as styles from './icon-button.css';

type Props = ComponentProps<'button'> & {
  children: ReactNode;
  label: string;
};

export const IconButton = ({ children, label, ...props }: Props) => {
  return (
    <button className={styles.button} {...props} aria-label={label}>
      {children}
    </button>
  );
};
