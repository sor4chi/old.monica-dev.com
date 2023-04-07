import type { ReactNode } from 'react';

import * as styles from './tag.css';

interface Props {
  children: ReactNode;
  variant?: 'info' | 'danger';
}

export const Tag = ({ children, variant = 'info' }: Props) => <span className={styles.tag[variant]}>{children}</span>;
