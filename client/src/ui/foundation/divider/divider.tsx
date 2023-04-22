import * as styles from './divider.css';

interface Props {
  direction?: 'horizontal' | 'vertical';
  margin?: string;
}

export const Divider = ({ direction = 'horizontal', margin }: Props) => {
  return <hr className={styles.divider[direction]} style={{ margin }} />;
};
