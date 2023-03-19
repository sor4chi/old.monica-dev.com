import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import * as styles from './textarea.css';

type Props = ComponentPropsWithoutRef<'textarea'> & {
  placeholder?: string;
  error?: string;
  label: string;
  id: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(({ error, id, label, placeholder, ...props }, ref) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea className={styles.textarea} placeholder={placeholder} {...props} ref={ref} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
