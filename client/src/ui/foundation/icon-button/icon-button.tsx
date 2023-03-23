import type { ComponentProps, ReactNode } from 'react';

import * as styles from './icon-button.css';

type Props = ComponentProps<'button'> & {
  icon: ReactNode;
  children: ReactNode;
};

export const IconButton = ({ children, icon, ...props }: Props) => {
  return (
    <button className={styles.button} {...props}>
      {icon}
      {children}
    </button>
  );
};
