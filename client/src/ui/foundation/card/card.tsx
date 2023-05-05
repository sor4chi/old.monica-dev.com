import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { memo } from 'react';

import * as styles from './card.css';

interface Props {
  children: ReactNode;
  padding?: 'no' | 'sm' | 'md' | 'lg';
}

const _Card = ({ children, padding = 'md' }: Props) => {
  return <div className={clsx(styles.card, styles.cardPadding[padding])}>{children}</div>;
};

export const Card = memo(_Card);
