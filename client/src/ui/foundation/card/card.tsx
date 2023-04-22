import type { ReactNode } from 'react';
import { memo } from 'react';

import * as styles from './card.css';

interface Props {
  children: ReactNode;
}

const _Card = ({ children }: Props) => {
  return <div className={styles.card}>{children}</div>;
};

export const Card = memo(_Card);
