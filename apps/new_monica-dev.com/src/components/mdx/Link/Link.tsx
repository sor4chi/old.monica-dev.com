import type { ComponentPropsWithoutRef } from 'react';
import { ArrowUpRight } from 'react-feather';

import { styles } from './Link.css';

import { TransitionLink } from '@/components/logical/TransitionLink';

export const Link = ({ children, href, ...props }: ComponentPropsWithoutRef<'a'>) => {
  const isExternal = href?.startsWith('http');

  if (isExternal) {
    return (
      <a className={styles.link} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        <ArrowUpRight strokeWidth={1.5} size="1em" className={styles.externalLinkIcon} />
      </a>
    );
  }

  return (
    <TransitionLink href={href as string} className={styles.link} {...props}>
      {children}
    </TransitionLink>
  );
};
