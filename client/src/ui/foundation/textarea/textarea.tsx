import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import * as styles from './textarea.css';

type Props = ComponentPropsWithoutRef<'textarea'> & {
  placeholder?: string;
  error?: string;
  label?: string;
  id: string;
  resize?: boolean;
  height?: string;
  rows?: number;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ error, height, id, label, placeholder, resize, rows, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          className={styles.textarea}
          placeholder={placeholder}
          {...props}
          ref={ref}
          style={{ height, resize: resize ? 'vertical' : 'none' }}
          rows={rows}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
