import clsx from 'clsx';
import type { ComponentProps, JSXElementConstructor, ReactNode } from 'react';

import { styles } from './Link.css';

type Component = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

type Props<T extends Component> = ComponentProps<T> & {
  tag: T;
  children: ReactNode;
  expand?: boolean;
};

export const Link = <T extends Component>({ children, expand = false, tag: Tag, ...props }: Props<T>) => {
  return (
    <Tag className={clsx(styles.link, expand && styles.linkExpand)} {...props}>
      {children}
    </Tag>
  );
};
