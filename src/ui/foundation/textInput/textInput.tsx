import type { ComponentProps } from 'react';

import * as styles from './textInput.css';

type Props = ComponentProps<'input'> & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label: string;
  id: string;
};

export const TextInput = ({ error, id, label, onChange, placeholder, value, ...props }: Props) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
