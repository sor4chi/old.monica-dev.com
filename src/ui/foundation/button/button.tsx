import type { ComponentProps } from 'react';

import * as styles from './button.css';

type Props = ComponentProps<'button'>;

export const Button = ({ ...props }: Props) => {
  return <button className={styles.button} {...props} />;
};
