import type { ReactNode } from 'react';

import * as styles from './badge.css';

interface Props {
  children: ReactNode;
  variant?: 'info' | 'danger';
}

export const Badge = ({ children, variant = 'info' }: Props) => <span className={styles.badge[variant]}>{children}</span>;
