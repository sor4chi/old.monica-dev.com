import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';

import { IconButton } from '../icon-button';

import * as styles from './textInput.css';

type Props = ComponentPropsWithoutRef<'input'> & {
  placeholder?: string;
  error?: string;
  label: string;
  id: string;
  icon?: ReactNode;
  iconLabel?: string;
  onIconClick?: () => void;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ error, icon, iconLabel, id, label, onIconClick, placeholder, ...props }, ref) => {
    return (
      <div className={styles.wrapper}>
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
        <div className={styles.inputContainer}>
          <input id={id} className={styles.input} placeholder={placeholder} {...props} ref={ref} />
          {icon && (
            <div className={styles.icon}>
              {onIconClick ? (
                <IconButton label={iconLabel || ''} onClick={onIconClick} type="button">
                  {icon}
                </IconButton>
              ) : (
                icon
              )}
            </div>
          )}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
