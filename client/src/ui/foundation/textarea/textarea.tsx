import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

import { INDENT_SIZE, TAB_KEY } from './constants';
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
const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === TAB_KEY) {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    target.value = `${target.value.substring(0, start)}${' '.repeat(INDENT_SIZE)}${target.value.substring(end)}`;
    target.selectionStart = target.selectionEnd = start + 1;
  }
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
          onKeyDown={onKeyDown}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
