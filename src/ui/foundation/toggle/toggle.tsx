import type { ComponentProps } from 'react';

import * as styles from './toggle.css';

type Props = ComponentProps<'input'> & {
  label: string;
  id: string;
};

export const Toggle = ({ ...props }: Props) => {
  return (
    <label className={styles.toggle[props.checked ? 'on' : 'off']} htmlFor={props.id} aria-label={props.label}>
      <input className={styles.input} type="checkbox" {...props} id={props.id} />
      <span className={styles.toggleCursor[props.checked ? 'on' : 'off']} />
    </label>
  );
};
