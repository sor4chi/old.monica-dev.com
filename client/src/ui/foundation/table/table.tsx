import { clsx } from 'clsx';
import type { ComponentProps, ReactNode } from 'react';
import { memo } from 'react';

import * as styles from './table.css';

interface Props {
  children: ReactNode;
}

const _Table = ({ children, ...rest }: Props & ComponentProps<'table'>) => (
  <table className={styles.table} {...rest}>
    {children}
  </table>
);
const _THead = ({ children, ...rest }: Props & ComponentProps<'thead'>) => (
  <thead className={styles.thead} {...rest}>
    {children}
  </thead>
);
const _TBody = ({ children, ...rest }: Props & ComponentProps<'tbody'>) => (
  <tbody className={styles.tbody} {...rest}>
    {children}
  </tbody>
);
const _TR = ({ children, onClick, ...rest }: Props & ComponentProps<'tr'>) => (
  <tr className={clsx(styles.tr, onClick && styles.trClickable)} onClick={onClick} {...rest}>
    {children}
  </tr>
);
const _TH = ({ children, ...rest }: Props & ComponentProps<'th'>) => (
  <th className={styles.th} {...rest}>
    {children}
  </th>
);
const _TD = ({ children, ...rest }: Props & ComponentProps<'td'>) => (
  <td className={styles.td} {...rest}>
    {children}
  </td>
);

export const FT = {
  Body: memo(_TBody),
  Data: memo(_TD),
  Head: memo(_THead),
  Header: memo(_TH),
  Row: memo(_TR),
  Table: memo(_Table),
};
