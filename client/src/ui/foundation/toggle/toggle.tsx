import type { ComponentProps } from 'react';
import { forwardRef, memo } from 'react';

import * as styles from './toggle.css';

type Props = ComponentProps<'input'> & {
  label: string;
  id: string;
};

const _Toggle = forwardRef<HTMLInputElement, Props>(({ id, label, ...props }, ref) => {
  return (
    <label htmlFor={id}>
      <input className={styles.input} type="checkbox" {...props} id={id} ref={ref} />
      <span className={styles.toggleWrapper}>
        <span className={styles.label}>{label}</span>
        <span className={styles.toggle}>
          <span className={styles.toggleCursor}></span>
        </span>
      </span>
    </label>
  );
});

_Toggle.displayName = 'Toggle';

export const Toggle = memo(_Toggle);
