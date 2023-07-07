import type { ReactNode } from 'react';

import * as styles from './badge.css';

interface Props {
  children: ReactNode;
  variant?: 'success' | 'danger';
}

export const Badge = ({ children, variant = 'success' }: Props) => <span className={styles.badge[variant]}>{children}</span>;
