import { forwardRef } from 'react';
import type { ComponentProps, Ref } from 'react';

import { styles } from './Button.css';

type Props = ComponentProps<'button'>;

export const Button = forwardRef(({ children, ...props }: Props, ref: Ref<HTMLButtonElement>) => {
  return (
    <button className={styles.button} ref={ref} {...props}>
      {children}
    </button>
  );
});

Button.displayName = 'Button';
