import type { ComponentProps, JSXElementConstructor, ReactNode } from 'react';

import { styles } from './Link.css';

type Component = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

type Props<T extends Component> = ComponentProps<T> & {
  tag: T;
  children: ReactNode;
};

export const Link = <T extends Component>({ children, tag: Tag, ...props }: Props<T>) => {
  return (
    <Tag className={styles.link} {...props}>
      {children}
    </Tag>
  );
};
