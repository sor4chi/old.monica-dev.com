import type { ComponentProps } from 'react';
import { forwardRef, memo } from 'react';

import * as styles from './checkbox.css';

import { parseTwemoji } from '@/lib/twemoji';

type Props = ComponentProps<'input'> & {
  label: string;
  id: string;
};

const _Checkbox = forwardRef<HTMLInputElement, Props>(({ id, label, ...props }, ref) => {
  return (
    <label className={styles.wrapper} htmlFor={id}>
      <input className={styles.checkbox} type="checkbox" {...props} ref={ref} id={id} />
      <span className={styles.label} dangerouslySetInnerHTML={{ __html: parseTwemoji(label) }} />
    </label>
  );
});

_Checkbox.displayName = 'Checkbox';

export const Checkbox = memo(_Checkbox);
