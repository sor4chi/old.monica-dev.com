import type { ComponentProps } from 'react';

import * as styles from './textarea.css';

type Props = ComponentProps<'textarea'> & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label: string;
  id: string;
};

export const Textarea = ({ error, id, label, onChange, placeholder, value, ...props }: Props) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
