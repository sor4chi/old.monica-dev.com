import { clsx } from 'clsx';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, Ref } from 'react';

import { styles } from './Button.css';

type Props = ComponentPropsWithoutRef<'button'> & {
  variant?: 'text' | 'icon';
};

export const Button = forwardRef(({ children, variant = 'text', ...props }: Props, ref: Ref<HTMLButtonElement>) => {
  return (
    <button className={clsx(styles.button, styles.buttonVariant[variant])} ref={ref} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
