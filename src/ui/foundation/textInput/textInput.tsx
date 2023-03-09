import type { ComponentProps } from 'react';

import * as styles from './textInput.css';

type Props = ComponentProps<'input'> & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const TextInput = ({ onChange, placeholder, value, ...props }: Props) => {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      {...props}
    />
  );
};
