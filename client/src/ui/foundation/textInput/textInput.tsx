import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import * as styles from './textInput.css';

type Props = ComponentPropsWithoutRef<'input'> & {
  placeholder?: string;
  error?: string;
  label: string;
  id: string;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(({ error, id, label, placeholder, ...props }, ref) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input id={id} className={styles.input} placeholder={placeholder} {...props} ref={ref} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
});

TextInput.displayName = 'TextInput';
