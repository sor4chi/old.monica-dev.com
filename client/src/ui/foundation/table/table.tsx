import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { memo } from 'react';

import * as styles from './table.css';

interface Props {
  children: ReactNode;
}

type TRProps = Props & {
  onClick?: () => void;
};

const _Table = ({ children }: Props) => <table className={styles.table}>{children}</table>;
const _THead = ({ children }: Props) => <thead className={styles.thead}>{children}</thead>;
const _TBody = ({ children }: Props) => <tbody className={styles.tbody}>{children}</tbody>;
const _TR = ({ children, onClick }: TRProps) => (
  <tr className={clsx(styles.tr, onClick && styles.trClickable)} onClick={onClick}>
    {children}
  </tr>
);
const _TH = ({ children }: Props) => <th className={styles.th}>{children}</th>;
const _TD = ({ children }: Props) => <td className={styles.td}>{children}</td>;

export const FT = {
  Body: memo(_TBody),
  Data: memo(_TD),
  Head: memo(_THead),
  Header: memo(_TH),
  Row: memo(_TR),
  Table: memo(_Table),
};
