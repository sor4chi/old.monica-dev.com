import * as styles from './divider.css';

interface Props {
  direction?: 'horizontal' | 'vertical';
}

export const Divider = ({ direction = 'horizontal' }: Props) => {
  return <hr className={styles.divider[direction]} />;
};
